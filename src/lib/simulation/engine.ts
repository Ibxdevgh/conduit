import type {
  AgentWallet,
  ComplianceCheck,
  ComplianceRules,
  PaymentRequest,
  PaymentResult,
  Transaction,
} from './types';
import {
  generateAgentId,
  generateBase58Key,
  generateTxSignature,
  randomAgent,
  randomAmount,
  randomCategory,
  randomMerchant,
  randomSettlementTime,
} from './generators';

class SimulationEngine {
  wallets: Map<string, AgentWallet> = new Map();
  transactions: Transaction[] = [];
  dailySpend: Map<string, number> = new Map();
  hourlyTxCount: Map<string, number> = new Map();

  /**
   * Creates a new agent wallet with a fake base58 public key and 1000 USDC starting balance.
   */
  createWallet(name: string, compliance: ComplianceRules): AgentWallet {
    const id = generateAgentId();
    const wallet: AgentWallet = {
      id,
      publicKey: generateBase58Key(),
      name,
      balance: 1000,
      createdAt: Date.now(),
      compliance,
    };
    this.wallets.set(id, wallet);
    this.dailySpend.set(id, 0);
    this.hourlyTxCount.set(id, 0);
    return wallet;
  }

  /**
   * Retrieve a wallet by its ID.
   */
  getWallet(id: string): AgentWallet | undefined {
    return this.wallets.get(id);
  }

  /**
   * Run compliance checks and process a payment if all checks pass.
   * Returns a PaymentResult with detailed check results and timing.
   */
  processPayment(req: PaymentRequest): PaymentResult {
    const wallet = this.wallets.get(req.walletId);
    const checks: ComplianceCheck[] = [];
    let failed = false;
    let errorMessage: string | undefined;

    if (!wallet) {
      const tx = this.buildTransaction({
        agentId: req.walletId,
        agentName: 'unknown',
        merchantId: req.merchantId,
        merchantName: req.merchantName,
        amount: req.amount,
        category: req.category,
        status: 'failed',
      });
      return {
        transaction: tx,
        checks: [],
        success: false,
        error: `Wallet ${req.walletId} not found`,
      };
    }

    // --- Check 1: Per-transaction amount limit ---
    const amountCheckDuration = this.randomCheckDuration();
    if (req.amount > wallet.compliance.perTxLimit) {
      checks.push({
        name: 'per_tx_limit',
        status: 'fail',
        detail: `Amount $${req.amount.toFixed(2)} exceeds per-transaction limit of $${wallet.compliance.perTxLimit.toFixed(2)}`,
        duration: amountCheckDuration,
      });
      failed = true;
      errorMessage = `Per-transaction limit exceeded: $${req.amount.toFixed(2)} > $${wallet.compliance.perTxLimit.toFixed(2)}`;
    } else {
      checks.push({
        name: 'per_tx_limit',
        status: 'pass',
        detail: `Amount $${req.amount.toFixed(2)} within per-transaction limit of $${wallet.compliance.perTxLimit.toFixed(2)}`,
        duration: amountCheckDuration,
      });
    }

    // --- Check 2: Daily spend limit ---
    const dailyCheckDuration = this.randomCheckDuration();
    const currentDailySpend = this.dailySpend.get(wallet.id) ?? 0;
    const projectedDailySpend = currentDailySpend + req.amount;
    if (projectedDailySpend > wallet.compliance.dailyLimit) {
      checks.push({
        name: 'daily_limit',
        status: 'fail',
        detail: `Projected daily spend $${projectedDailySpend.toFixed(2)} exceeds daily limit of $${wallet.compliance.dailyLimit.toFixed(2)}`,
        duration: dailyCheckDuration,
      });
      if (!failed) {
        failed = true;
        errorMessage = `Daily limit exceeded: $${projectedDailySpend.toFixed(2)} > $${wallet.compliance.dailyLimit.toFixed(2)}`;
      }
    } else {
      checks.push({
        name: 'daily_limit',
        status: 'pass',
        detail: `Projected daily spend $${projectedDailySpend.toFixed(2)} within daily limit of $${wallet.compliance.dailyLimit.toFixed(2)}`,
        duration: dailyCheckDuration,
      });
    }

    // --- Check 3: Category allowed ---
    const categoryCheckDuration = this.randomCheckDuration();
    if (!wallet.compliance.allowedCategories.includes(req.category)) {
      checks.push({
        name: 'category_check',
        status: 'fail',
        detail: `Category "${req.category}" not in allowed list [${wallet.compliance.allowedCategories.join(', ')}]`,
        duration: categoryCheckDuration,
      });
      if (!failed) {
        failed = true;
        errorMessage = `Category "${req.category}" is not permitted for this wallet`;
      }
    } else {
      checks.push({
        name: 'category_check',
        status: 'pass',
        detail: `Category "${req.category}" is permitted`,
        duration: categoryCheckDuration,
      });
    }

    // --- Check 4: Geo restriction ---
    const geoCheckDuration = this.randomCheckDuration();
    // In simulation, geo always passes unless restriction is set to "blocked"
    const geoRestriction = wallet.compliance.geoRestriction;
    if (geoRestriction === 'blocked') {
      checks.push({
        name: 'geo_restriction',
        status: 'fail',
        detail: `Transaction blocked by geo restriction policy "${geoRestriction}"`,
        duration: geoCheckDuration,
      });
      if (!failed) {
        failed = true;
        errorMessage = `Transaction blocked by geo restriction`;
      }
    } else {
      checks.push({
        name: 'geo_restriction',
        status: 'pass',
        detail: `Geo policy "${geoRestriction}" permits transaction`,
        duration: geoCheckDuration,
      });
    }

    // --- Check 5: Velocity limit (max txs per hour) ---
    const velocityCheckDuration = this.randomCheckDuration();
    const currentHourlyCount = this.hourlyTxCount.get(wallet.id) ?? 0;
    if (currentHourlyCount + 1 > wallet.compliance.velocityLimit) {
      checks.push({
        name: 'velocity_limit',
        status: 'fail',
        detail: `Hourly tx count ${currentHourlyCount + 1} exceeds velocity limit of ${wallet.compliance.velocityLimit} txs/hour`,
        duration: velocityCheckDuration,
      });
      if (!failed) {
        failed = true;
        errorMessage = `Velocity limit exceeded: ${currentHourlyCount + 1} > ${wallet.compliance.velocityLimit} txs/hour`;
      }
    } else {
      checks.push({
        name: 'velocity_limit',
        status: 'pass',
        detail: `Hourly tx count ${currentHourlyCount + 1} within velocity limit of ${wallet.compliance.velocityLimit} txs/hour`,
        duration: velocityCheckDuration,
      });
    }

    // --- Build transaction ---
    if (failed) {
      const tx = this.buildTransaction({
        agentId: wallet.id,
        agentName: wallet.name,
        merchantId: req.merchantId,
        merchantName: req.merchantName,
        amount: req.amount,
        category: req.category,
        status: 'failed',
      });
      this.transactions.push(tx);
      return { transaction: tx, checks, success: false, error: errorMessage };
    }

    // All checks passed — deduct balance and record spend
    wallet.balance = Math.round((wallet.balance - req.amount) * 100) / 100;
    this.dailySpend.set(wallet.id, currentDailySpend + req.amount);
    this.hourlyTxCount.set(wallet.id, currentHourlyCount + 1);

    const tx = this.buildTransaction({
      agentId: wallet.id,
      agentName: wallet.name,
      merchantId: req.merchantId,
      merchantName: req.merchantName,
      amount: req.amount,
      category: req.category,
      status: 'settled',
    });
    this.transactions.push(tx);

    return { transaction: tx, checks, success: true };
  }

  /**
   * Generates a random settled transaction for the SSE feed.
   * Does not affect any wallet balances.
   */
  generateRandomTransaction(): Transaction {
    const agent = randomAgent();
    const merchant = randomMerchant();
    const tx = this.buildTransaction({
      agentId: agent.id,
      agentName: agent.name,
      merchantId: merchant.id,
      merchantName: merchant.name,
      amount: randomAmount(),
      category: randomCategory(),
      status: 'settled',
    });
    this.transactions.push(tx);
    return tx;
  }

  // --- Private helpers ---

  private buildTransaction(params: {
    agentId: string;
    agentName: string;
    merchantId: string;
    merchantName: string;
    amount: number;
    category: string;
    status: Transaction['status'];
  }): Transaction {
    return {
      id: generateAgentId(),
      agentId: params.agentId,
      agentName: params.agentName,
      merchantId: params.merchantId,
      merchantName: params.merchantName,
      amount: params.amount,
      currency: 'USDC',
      status: params.status,
      category: params.category,
      timestamp: Date.now(),
      settlementTime: randomSettlementTime(),
      signature: generateTxSignature(),
    };
  }

  private randomCheckDuration(): number {
    // Returns a simulated check duration between 50ms and 150ms
    return Math.floor(50 + Math.random() * 100);
  }
}

// Singleton instance
export const engine = new SimulationEngine();
