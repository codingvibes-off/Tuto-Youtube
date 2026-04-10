## Valentino Magic Beans (Playwright Tests)

Minimal end‑to‑end/UI and API test suite using Playwright.

### Prerequisites
1. Node.js 22+ (LTS recommended)
2. Install browsers once: `npx playwright install`
3. (Optional) MailSlurp API key for email tests: create an account and set an environment variable in the file .env and in .vscode/settings.json.

### Generating credentials:
1. Run first the tests/auth-flow.spec.ts

### Environment Variables
Set before running tests (PowerShell example shown; adapt for your shell):

```
set MAIL_SLURP_API_KEY=your_api_key_here
```

Used in `tests/utils/EmailUtils.ts` to create inboxes and fetch emails.

### Install Dependencies
```
npm install
```

### Run Tests
```
npx playwright test
```

Run headed (see the browser):
```
npx playwright test --headed
```

Filter by file or folder:
```
npx playwright test tests/basic/Cart.spec.ts
```

### View HTML Report
After a run:
```
npx playwright show-report
```
Or open the generated `playwright-report/index.html` in a browser.

### Auth Setup
If there is an auth setup file (`tests/setup/auth.setup.ts`), ensure any required credentials are provided via env vars or fixtures (not included here for minimalism).

### Project Structure (excerpt)
```
tests/
	pages/        # Page Object Models (Cart, Checkout, Login, etc.)
	basic/        # Basic feature specs
	requests/     # Network interception / API related specs
	utils/        # Helpers (EmailUtils)
playwright.config.ts  # Global Playwright configuration
```

### Updating / Adding Tests
1. Add new `.spec.ts` files under `tests/`.
2. Reuse or extend Page Objects in `tests/pages/`.
3. Keep helpers stateless where possible.

### Troubleshooting
- Deleted browsers? Reinstall: `npx playwright install`.
- Need debug: `npx playwright test --debug`.
- Failures only: `npx playwright test --fail-only`.

### License
ISC (see `package.json`).

