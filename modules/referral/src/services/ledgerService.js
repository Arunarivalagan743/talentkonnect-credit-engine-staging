
/**
 * Ledger Service Module
 * - Persists credit events to a simple in-memory array.
 * - Functions to add events and fetch user totals/events.
 */

// Use a module-scoped array as our "DB"
const ledger = [];

/**
 * Add a new ledger entry (persist a credit event).
 * 
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.actionType
 * @param {number} params.creditsAwarded
 * @param {number} params.referrerBonus
 * @param {string} params.timestamp (ISO string)
 * @returns {Object} The created ledger event
 */
export function addLedgerEntry({ userId, actionType, creditsAwarded, referrerBonus, timestamp }) {
  const entry = {
    userId,
    actionType,
    creditsAwarded,
    referrerBonus,
    timestamp,
  };
  ledger.push(entry);
  return entry;
}

/**
 * Get all ledger entries for a user.
 * @param {string} userId
 * @returns {Array<Object>}
 */
export function getUserLedger(userId) {
  return ledger.filter((e) => e.userId === userId);
}

/**
 * Get the total credits for a user.
 * @param {string} userId
 * @returns {number} Sum of creditsAwarded for this user
 */
export function getUserTotalCredits(userId) {
  return ledger
    .filter((e) => e.userId === userId)
    .reduce((sum, e) => sum + (e.creditsAwarded || 0), 0);
}

/**
 * API-compatible helper for /api/credits/:userId
 * @param {string} userId
 * @returns {Object}
 */
export function handleCreditsApi(userId) {
  return {
    userId,
    totalCredits: getUserTotalCredits(userId),
    events: getUserLedger(userId),
  };
}
