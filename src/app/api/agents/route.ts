import { engine } from '@/lib/simulation/engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        try {
          const tx = engine.generateRandomTransaction();
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(tx)}\n\n`));
        } catch { /* stream closed */ }
      };
      send(); // send one immediately
      const interval = setInterval(() => {
        send();
      }, 2000 + Math.random() * 3000);
      // Clean up — but note: Next.js doesn't call cancel reliably, so this is best-effort
      const cleanup = () => clearInterval(interval);
      // After 5 min, stop to prevent leaked intervals
      setTimeout(() => { cleanup(); try { controller.close(); } catch {} }, 300000);
    },
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
