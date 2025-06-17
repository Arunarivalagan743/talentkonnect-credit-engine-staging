

# TalentKonnect Credit Engine – Staging

A modular microservices-based credit engine built for TalentKonnect’s credit system. This staging repository merges and integrates five distinct service bundles, each responsible for specific functions like enrollment, validation, referral tracking, credit calculation, and test documentation.

> ✅ This is a technical assessment project for the **Contract Web Developer** role at Alatree Ventures.

---

## 📁 Project Structure

talentkonnect-credit-engine-staging/
├── modules/
│ ├── bootstrap/ # Bundle 1+2
│ ├── validation/ # Bundle 3+4
│ ├── referral/ # Bundle 5+6
│ ├── enrolment/ # Bundle 7+8
│ └── tests/ # Bundle 9+10


---

## 🚀 Live Staging URLs

| Module       | Purpose                                | Deployment URL |
|--------------|----------------------------------------|----------------|
| **Bootstrap**  | Enroll user, fetch credit data        | [Live](https://talentkonnect-credit-engine-staging-2.onrender.com) |
| **Validation** | Validate schema, calculate credit     | [Live](https://talentkonnect-credit-engine-staging-3.onrender.com) |
| **Referral**   | Record referrals, ledger history      | [Live](https://talentkonnect-credit-engine-staging.vercel.app)     |
| **Enrolment**  | Enroll user, show current balance     | [Live](https://talentkonnect-credit-engine-staging-pi.vercel.app)  |
| **Tests**      | Unit testing + API documentation      | [Live](https://talentkonnect-credit-engine-staging-5.onrender.com) |

---

## 📦 Bundles & Responsibilities

### 🔹 Bundle 1+2 – `/modules/bootstrap/`
- Source: [PrachiCKadu/credit-engine](https://github.com/PrachiCKadu/credit-engine)
- Endpoints:
  - `POST /api/enroll` – Enroll a new user
  - `GET /api/credits/:userId` – Get credits for a user

### 🔹 Bundle 3+4 – `/modules/validation/`
- Source: [MonikaNavapariya9/credit-engine](https://github.com/MonikaNavapariya9/credit-engine)
- Endpoints:
  - `POST /api/validate` – Validate payload schema
  - `POST /api/calc` – Calculate credits from payload

### 🔹 Bundle 5+6 – `/modules/referral/`
- Source: [Ajayyadav3/credit-spark-engine](https://github.com/Ajayyadav3/credit-spark-engine)
- Endpoints:
  - `POST /api/enroll` – Enroll or refer a user
  - `GET /api/credits/:userId` – Get ledger history

### 🔹 Bundle 7+8 – `/modules/enrolment/`
- Source: [RKG01/credit-engine-frontend](https://github.com/RKG01/credit-engine-frontend)
- Endpoints:
  - `POST /api/enroll` – Enroll user
  - `GET /api/credits/:userId` – Current credit balance

### 🔹 Bundle 9+10 – `/modules/tests/`
- Source: [tejaxzzz/credit-engine](https://github.com/tejaxzzz/credit-engine)
- Contains:
  - Unit test suite (`npm test`)
  - `API.md` with endpoint documentation

---

## 🧪 Testing

Navigate to `/modules/tests/` and run:

```bash
npm install
npm test

All tests should pass. This validates the integrity of the merged services.
🛠️ Tech Stack

    Node.js

    Express.js

    Jest/Mocha (for testing)

    Render & Vercel (deployment)

📌 Notes

    Each module is independently deployable and testable.

    All services preserve the original endpoint structure as required.

    Conflicts have been resolved, and redundant code cleaned where necessary.

🙋‍♂️ Maintainer

Arun Arivalagan
Email: arunarivalagan774@gmail.com
GitHub: @Arunarivalagan743


Let me know if you'd like to add API usage examples or a section about environment variables to this [README](f).

