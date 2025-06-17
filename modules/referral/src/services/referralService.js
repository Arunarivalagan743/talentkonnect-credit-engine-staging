
/**
 * Referral Service Module
 * - Awards referrer bonus if referrerId provided.
 * - Enrolls user and notifies ledger.
 * - Exports main functions for use in enroll flow.
 */

import { addLedgerEntry } from "./ledgerService";

/**
 * Enroll a user and optionally award a referrer bonus.
 * 
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.actionType
 * @param {number} params.creditsAwarded
 * @param {string} [params.referrerId] e.g., another user who referred
 * @returns {Object} Enrollment result and credit events
 */
export function enrollUserWithReferral({ userId, actionType, creditsAwarded, referrerId }) {
  // 1. Award credits to enrolling user
  const now = new Date().toISOString();

  const userEvent = addLedgerEntry({
    userId,
    actionType,
    creditsAwarded,
    referrerBonus: 0,
    timestamp: now,
  });

  let referrerEvent = null;

  // 2. If a referrerId is present, award a referral bonus to the referrer
  if (referrerId) {
    // Example: Referral bonus could be 10, could make this configurable
    const refBonus = 10;
    referrerEvent = addLedgerEntry({
      userId: referrerId,
      actionType: "referral_bonus",
      creditsAwarded: refBonus,
      referrerBonus: 0,
      timestamp: now,
    });
  }

  return {
    enrolled: true,
    userEvent,
    referrerEvent,
  };
}

/**
 * API-compatible helper for /api/enroll
 * @param {Object} reqBody
 * @returns {Object}
 */
export function handleEnrollApi(reqBody) {
  // Expect: { userId, actionType, creditsAwarded, referrerId (optional) }
  return enrollUserWithReferral(reqBody);
}
