export interface AgentWallet {
  id: string;
  publicKey: string;
  name: string;
  balance: number;
  createdAt: number;
  compliance: ComplianceRules;
}

export interface ComplianceRules {
  dailyLimit: number;
  perTxLimit: number;
  allowedCategories: string[];
  geoRestriction: string;
  velocityLimit: number; // max txs per hour
}

export interface Transaction {
  id: string;
  agentId: string;
  agentName: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'compliance_check' | 'processing' | 'settled' | 'failed';
  category: string;
  timestamp: number;
  settlementTime: number;
  signature: string;
}

export interface PaymentRequest {
  walletId: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  category: string;
}

export interface ComplianceCheck {
  name: string;
  status: 'pass' | 'fail';
  detail: string;
  duration: number;
}

export interface PaymentResult {
  transaction: Transaction;
  checks: ComplianceCheck[];
  success: boolean;
  error?: string;
}

export interface SimulatedAgent {
  id: string;
  name: string;
  type: string;
}
