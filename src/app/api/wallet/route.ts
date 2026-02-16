import { NextResponse } from 'next/server';
import { engine } from '@/lib/simulation/engine';

export async function POST(request: Request) {
  const { name, compliance } = await request.json();
  const wallet = engine.createWallet(name, compliance);
  return NextResponse.json(wallet);
}
