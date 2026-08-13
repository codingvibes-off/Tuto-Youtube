Je veux une application comme netflix mais pour le sport.


Creeer moi une application angular pour le frontend et pour le backend node.js
en utilise express, prisma utilise cette stack technique
Tu dois adapter tout l'arhictecture backend, frontend, pour creer ce site qui ce base sur netlfix en prioritie. Il y aaura un onglet seance homme et un onglet seance femme.

L"utilisateur pourrra voir des séance disponible comme sur netflix.

Sur chaque seance il pourra aussi voir tout les mouvements displonible. 
Pour les videos pour l'instant affiche une video qui fait offie de test ensuite je metttrai mes videos. 
voici le designe dont tu doit t'inspirer. 

https://fr.gymshark.com/


FRONT-END 
inspite toit de ces site les design sont disponible dans le dossier exexmple
# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.22.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


BACKEND 

# 🎓 E-Learning Platform — Backend API

Production-ready NestJS backend for an automated testing e-learning platform.

---

## 🏗️ Architecture Overview

```
src/
├── auth/                    # Authentication module (JWT, OAuth, email)
│   ├── dto/                 # Register, Login, Reset DTOs
│   ├── guards/              # JwtAuth, JwtRefresh, Roles, GoogleOAuth
│   ├── strategies/          # Passport strategies (JWT access, refresh, Google)
│   ├── auth.controller.ts   # All /auth/* endpoints
│   ├── auth.service.ts      # Core auth business logic
│   └── email.service.ts     # Email sending (verify, reset)
│
├── user/                    # User module
│   ├── dto/                 # UpdateUser DTO
│   ├── entities/            # UserEntity (with @Exclude on sensitive fields)
│   ├── user.controller.ts   # /users/* endpoints
│   └── user.service.ts      # User CRUD + token helpers
│
├── course/                  # Course, Chapter, Lesson, Progress
│   ├── dto/                 # Course/Chapter/Lesson DTOs
│   ├── course.controller.ts
│   └── course.service.ts
│
├── database/                # Prisma service (global)
│   └── prisma.service.ts
│
├── config/                  # Typed configuration (JWT, Google, Email, Security)
│
├── common/
│   ├── decorators/          # @CurrentUser, @Roles, @Public
│   ├── filters/             # HttpExceptionFilter (Prisma errors included)
│   └── interceptors/        # LoggingInterceptor, TransformInterceptor
│
└── main.ts                  # Bootstrap with Helmet, CORS, Validation, Swagger
```

---

## 🔐 Authentication Flow

### 1. Register
```
POST /api/v1/auth/register
Body: { email, password }

→ Hashes password with bcrypt (salt=12)
→ Creates user (isEmailVerified=false)
→ Generates secure 48-byte hex token
→ Stores token in DB with expiry (24h)
→ Sends verification email
→ Returns: { message }
```

### 2. Verify Email
```
POST /api/v1/auth/verify-email
Body: { token }

→ Validates token exists, not used, not expired
→ Sets isEmailVerified=true (atomic transaction)
→ Marks token as used
→ Returns: { message }
```

### 3. Login
```
POST /api/v1/auth/login
Body: { email, password }

→ Finds user by email
→ Compares password with bcrypt.compare
→ Checks isEmailVerified
→ Generates accessToken (15m) + refreshToken (7d)
→ Hashes refreshToken with bcrypt → stores in DB
→ Logs IP + userAgent in login_logs
→ Returns: { accessToken, refreshToken, user }
```

### 4. Access Protected Route
```
GET /api/v1/users/me
Header: Authorization: Bearer <accessToken>

→ JwtAccessStrategy validates signature + expiry
→ Loads user from DB, checks exists + verified
→ Injects user into request
```

### 5. Refresh Token (Rotation)
```
POST /api/v1/auth/refresh
Body: { refreshToken }

→ JwtRefreshStrategy validates signature + expiry
→ Fetches user, compares raw token to bcrypt hash
→ Generates NEW accessToken + NEW refreshToken
→ Replaces old hash in DB (rotation)
→ Returns: { accessToken, refreshToken, user }
```

### 6. Logout
```
POST /api/v1/auth/logout
Header: Authorization: Bearer <accessToken>

→ Sets refreshToken=null in DB
→ Any future refresh attempts will fail
```

### 7. Forgot Password
```
POST /api/v1/auth/forgot-password
Body: { email }

→ Always returns same message (prevents email enumeration)
→ If user exists: invalidates old tokens, creates new 30min token
→ Sends reset email with secure link
```

### 8. Reset Password
```
POST /api/v1/auth/reset-password
Body: { token, newPassword }

→ Validates token: exists, not used, not expired
→ Hashes new password
→ Clears refreshToken (invalidates all sessions)
→ Marks token as used
→ Atomic transaction
```

### 9. Google OAuth2
```
GET /api/v1/auth/google           → Redirects to Google
GET /api/v1/auth/google/callback  ← Google redirects here

→ GoogleStrategy validates profile
→ Finds or creates user (isEmailVerified=true)
→ Generates tokens, redirects to Angular:
   /auth/oauth-callback?accessToken=...&refreshToken=...
```

---

## 🛡️ Security Features

| Feature | Implementation |
|---|---|
| Password hashing | bcrypt with configurable salt rounds (default: 12) |
| JWT access token | Short-lived (15min), RS256 compatible |
| Refresh token | 7-day, hashed in DB with bcrypt, rotation on every use |
| Rate limiting | Global (60 req/min), Auth endpoints (5–10 req/min) |
| Security headers | Helmet with CSP |
| SQL injection | Prevented by Prisma parameterized queries |
| Email enumeration | Forgot password / resend always return same message |
| Token reuse | Refresh token invalidated after each use (rotation) |
| Session invalidation | Password reset clears all refresh tokens |
| Login logging | IP + user-agent logged for every attempt |
| DTO whitelisting | `whitelist: true` + `forbidNonWhitelisted: true` |
| Sensitive fields | `@Exclude()` via class-transformer on User entity |
| CORS | Restricted to Angular frontend URL |

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- Docker (for PostgreSQL)

### 1. Install dependencies
```bash
npm install
```

### 2. Start the database
```bash
docker-compose up -d postgres
```

### 3. Configure environment
```bash
cp .env.example .env
# Edit .env with your values (JWT secrets, SMTP, Google OAuth)
```

### 4. Generate JWT secrets
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
# Run twice — one for ACCESS, one for REFRESH
```

### 5. Run migrations and seed
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 5.1. Reset databse
```bash
npx prisma migrate reset
```
### 6. Start the server
```bash
npm run start:dev
```

### 7. Open Swagger
```
http://localhost:3000/api/docs
```

---

## 🔑 Default Seed Credentials

| Role | Email | Password |
|------|-------|----------|
| ADMIN | admin@elearning.com | Admin@123456 |
| USER | user@elearning.com | User@123456 |

---

## 📦 Postman

Import `postman_collection.json` into Postman.

The Login request automatically saves `accessToken` and `refreshToken` as collection variables. All protected requests use `{{accessToken}}` automatically.

---

## 🔧 Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | required |
| `JWT_ACCESS_SECRET` | Access token signing secret (min 64 chars) | required |
| `JWT_REFRESH_SECRET` | Refresh token signing secret (min 64 chars) | required |
| `JWT_ACCESS_EXPIRES_IN` | Access token TTL | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token TTL | `7d` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | required for OAuth |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | required for OAuth |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_USER` | SMTP username / email | required |
| `SMTP_PASS` | SMTP password / app password | required |
| `BCRYPT_SALT_ROUNDS` | bcrypt cost factor | `12` |
| `FRONTEND_URL` | Angular app URL (for CORS + email links) | `http://localhost:4200` |

---

## 📡 API Endpoints Summary



docker exec -it jaypartner-db psql -U postgres -d elearning