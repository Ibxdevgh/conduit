'use client';

import { useState } from 'react';

interface AgentWalletCreatorProps {
  onCreateWallet: (name: string) => void;
  loading: boolean;
  disabled: boolean;
}

const PRESET_NAMES = ['Atlas-7', 'Nexus-3', 'Orbital-12', 'Cipher-9'];

export function AgentWalletCreator({ onCreateWallet, loading, disabled }: AgentWalletCreatorProps) {
  const [name, setName] = useState('');

  const handleCreate = () => {
    const agentName = name.trim() || PRESET_NAMES[Math.floor(Math.random() * PRESET_NAMES.length)];
    onCreateWallet(agentName);
  };

  return (
    <div className="glow-card rounded-lg p-5">
      <h3 className="text-[12px] font-mono text-muted-2 tracking-[0.15em] uppercase mb-4">
        Deploy Agent Wallet
      </h3>

      <div className="space-y-3">
        <div>
          <label className="text-[11px] text-muted-2 font-mono block mb-1.5">
            Agent Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Atlas-7"
            disabled={disabled}
            className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-[13px] font-mono text-foreground placeholder:text-muted-3 focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PRESET_NAMES.map((preset) => (
            <button
              key={preset}
              onClick={() => setName(preset)}
              disabled={disabled}
              className="text-[10px] font-mono text-muted bg-surface-2 px-2 py-1 rounded hover:text-accent hover:bg-accent/10 transition-colors disabled:opacity-50"
            >
              {preset}
            </button>
          ))}
        </div>

        <button
          onClick={handleCreate}
          disabled={loading || disabled}
          className="w-full py-2.5 bg-accent text-background text-[11px] font-bold tracking-[0.15em] uppercase rounded hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Provisioning...' : disabled ? 'Wallet Active' : 'Provision Wallet'}
        </button>
      </div>
    </div>
  );
}
