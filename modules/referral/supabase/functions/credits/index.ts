
/// <reference lib="deno.unstable" />
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Example: use the same in-memory ledger for demo
let ledger: any[] = [];

function getUserLedger(userId: string) {
  return ledger.filter((entry) => entry.userId === userId);
}

function getUserTotalCredits(userId: string) {
  return ledger
    .filter((entry) => entry.userId === userId)
    .reduce((sum, entry) => sum + (entry.creditsAwarded || 0), 0);
}

serve(async (req: Request) => {
  const url = new URL(req.url);
  // For a route like /api/credits/someuserid, get ID from pathname.
  const userId = url.pathname.split("/").pop();

  if (!userId || userId === "credits") {
    return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
  }

  const totalCredits = getUserTotalCredits(userId);
  const events = getUserLedger(userId);

  return new Response(
    JSON.stringify({ userId, totalCredits, events }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
