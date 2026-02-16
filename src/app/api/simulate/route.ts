import { NextResponse } from 'next/server';
import { engine } from '@/lib/simulation/engine';
import type { PaymentRequest } from '@/lib/simulation/types';

export async function POST(request: Request) {
  const req: PaymentRequest = await request.json();
  const result = engine.processPayment(req);
  if (!result) {
    return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
  }
  return NextResponse.json(result);
}
