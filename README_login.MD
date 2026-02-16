# Login / Connect / Access Model (Current)

This file tracks the current runtime behavior for login, SnapTrade connect, and gated statement views.

## Runtime Rules
- App is public-first; core routes are accessible without route guards.
- Landing screen is `/brokeragesAndAccounts`.
- SnapTrade connect is available to guests.
- Login state is derived from `useAuthStore(state => state.user)`.

## SnapTrade Connect (Workflow #3)

### Frontend
- `src/layouts/brokeragesAndAccounts/SnapTradeConnectModal.js`
  - creates transient GUID `userId`
  - calls `supabaseService.registerUser(userId)`
  - stores transient `snapTradeUserId` + `snapUserSecret` in local store
  - requests portal link via `supabaseService.getSnapTradeLoginLink(...)`

- `src/services/supabaseService.js`
  - `registerUser` → `functions/v1/snaptrade-register-user-v2`
  - login link → `functions/v1/login-user`

### Redirect/Sync
- `src/layouts/SnapTradeRedirect.jsx`
  - invokes `functions/v1/snaptrade-accounts`
  - maps/persists accounts and holdings into Zustand app store
  - updates `snapTradeLastConnectedAt`

## Brokerages Panel UX
- Brokerages page shows a compact in-panel SnapTrade sync header when timestamp exists.
- Primary connect CTA label is now **Connect Brokerage**.
- CTA is disabled by default and becomes enabled only after a successful `Unlink Brokerage` action.

## Balance Sheet / Income Statement Paywall Rule
Unified rule (current):

`paywallEnabled = hasRows && !isLoggedIn`

Meaning:
- Logged-in user: no blur, no paywall banner.
- Guest: first 5 rows visible, rows 6+ blurred, CTA to `/billing`.

Implementation:
- `src/layouts/balanceSheet/BalanceSheet.jsx`
- `src/layouts/incomeStatement/IncomeStatement.jsx`
- `src/layouts/balanceSheet/ProRataTable.jsx`

## Password Reset / Set Password

### Request reset
- `src/layouts/sendPasswordReset/sendPasswordReset.jsx`
- calls `functions/v1/send-password-reset-link-email`
- UI debug panel/URL output removed (production-style view)

### Set password
- `src/layouts/setPassword/setPassword.jsx`
- reads `token` from query string
- encrypts password client-side
- invokes `functions/v1/set-password-with-token`

### Backend reset functions
- `send-password-reset-link-email`
  - validates origin + CORS
  - delegates link generation to `create-and-get-tokenized-url`
  - sends email via Postmark
- `set-password-with-token`
  - validates token in `password_reset_tokens`
  - updates `users.password_hash`
  - deletes consumed/expired token
  - includes preflight CORS with `x-client-info` allow header

## Data/Secret Notes
- Workflow #3 does not require DB persistence of SnapTrade `userSecret` for the main frontend flow.
- Service role keys remain server-side only.
