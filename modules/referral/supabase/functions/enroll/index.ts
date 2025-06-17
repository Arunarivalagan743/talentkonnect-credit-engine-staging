
/// <reference lib="deno.unstable" />
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Example: a simple in-memory ledger; replace with Supabase client for production!
let ledger: any[] = [];

function addLedgerEntry({ userId, actionType, creditsAwarded, referrerBonus = 0 }) {
  const entry = {
    userId,
    actionType,
    creditsAwarded,
    referrerBonus,
    timestamp: new Date().toISOString(),
  };
  ledger.push(entry);
  return entry;
}

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const body = await req.json();
  const { userId, actionType, creditsAwarded, referrerId } = body;

  if (!userId || !actionType || typeof creditsAwarded !== "number") {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  // Enroll user (award credits)
  const userEvent = addLedgerEntry({
    userId,
    actionType,
    creditsAwarded,
    referrerBonus: 0
  });

  let referrerEvent = null;

  if (referrerId) {
    // Example: hardcoded referral bonus 10
    referrerEvent = addLedgerEntry({
      userId: referrerId,
      actionType: "referral_bonus",
      creditsAwarded: 10,
      referrerBonus: 0
    });
  }

  return new Response(
    JSON.stringify({ enrolled: true, userEvent, referrerEvent }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
