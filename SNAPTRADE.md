# SnapTrade Integration Notes (Current)

## Current Implementation
- Frontend never calls SnapTrade directly.
- Frontend calls Supabase Edge Functions:
  - `snaptrade-register-user-v2`
  - `login-user`
  - `snaptrade-accounts`
- Account/holding normalization is handled in `src/services/snaptradeMappingService.js`.
- Broker options shown in UI come from `src/services/snaptradeBrokerAllowlistService.js`.

## Workflow #3 (Implemented)
1. User starts connect in `SnapTradeConnectModal`.
2. UI generates transient GUID `userId`.
3. Calls `snaptrade-register-user-v2` to create SnapTrade user.
4. Receives `userSecret`; stores it locally in Zustand (`useAuthStore`) for the active flow.
5. Calls `login-user` with `userId + userSecret + broker` to get portal link.
6. User completes SnapTrade portal.
7. Redirect route (`/snapTradeRedirect`) calls `snaptrade-accounts` and persists mapped accounts/holdings to `useAppStore`.
8. `snapTradeLastConnectedAt` is persisted and shown in the Brokerages panel.

## Credential Model
- App credentials (server-side only):
  - `SNAPTRADE_CLIENT_ID`
  - `SNAPTRADE_CONSUMER_KEY`
- Per-session user credentials:
  - transient `userId`
  - `userSecret` from SnapTrade registration

Important:
- Do not expose `SNAPTRADE_CONSUMER_KEY` in browser code.
- Workflow #3 does not require writing `userSecret` to the `users` table.

## Edge Function Requirements
Required function secrets:
- `SNAPTRADE_CLIENT_ID`
- `SNAPTRADE_CONSUMER_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Auth Pairing Rule (Critical)
`userId` and `userSecret` must remain paired exactly as issued. Mismatched pairs cause SnapTrade 401 errors.

## Common Failure Modes
- 401 from SnapTrade: mismatched `userId`/`userSecret`.
- Missing login link: broker slug missing or not allowlisted.
- Empty holdings: account has no positions yet or connector sync has not completed.

## Security Notes
- Keep SnapTrade calls on Edge Functions only.
- Log redacted secrets/fingerprints, never full secrets.
- Treat any local `userSecret` persistence as transient/session continuity behavior.

## Deploy Edge Functions

```bash
supabase login
supabase link --project-ref <project_ref>
supabase functions deploy
supabase functions list
```

Delete remote functions that are no longer local:

```powershell
$local = Get-ChildItem .\supabase\functions -Directory | Select-Object -ExpandProperty Name
$remote = (supabase functions list --output json | ConvertFrom-Json) | Select-Object -ExpandProperty name
$toDelete = $remote | Where-Object { $_ -notin $local }
foreach ($fn in $toDelete) { supabase functions delete $fn }
```
