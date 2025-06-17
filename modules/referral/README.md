
# Credit Engine

A demo referral and credit awarding engine with two main modules:
- **Enroll Module:** Enroll a user and handle referral bonuses.
- **Credits Module:** View a user's credit events and total credits.

## Features

- Enroll users and award them credits
- Award referral bonuses to referrers
- View per-user ledger of credit events

## Endpoints

- `POST /api/enroll`  
  Enrolls a user, awards credits, and (optionally) awards referral bonus.
  #### Example request body:
  ```json
  {
    "userId": "alice",
    "actionType": "signup",
    "creditsAwarded": 50,
    "referrerId": "bob"
  }
  ```

- `GET /api/credits/:userId`  
  Returns a user's credit ledger and total credits.

## How It Works

- Uses an in-memory ledger (for demo purposes)
- Referral bonuses are awarded automatically (default: 10 credits)


## Live Demo

- **Frontend:** [Live Staging URL](#)
- **GitHub:** [GitHub Repo](#)

## Project Structure

```
src/
  pages/Index.tsx         // Demo UI
  services/ledgerService.js // Ledger logic
  services/referralService.js // Referral/enrollment logic
supabase/functions/
  enroll/index.ts         // /api/enroll endpoint
  credits/index.ts        // /api/credits/:userId endpoint
```



