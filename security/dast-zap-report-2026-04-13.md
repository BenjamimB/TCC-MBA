# DAST Security Report — OWASP ZAP

| Field       | Value                                          |
|-------------|------------------------------------------------|
| Target      | http://localhost:3001                          |
| Scan Type   | baseline                                       |
| Date        | 2026-04-13T17:02:38Z                           |
| ZAP Version | zaproxy/zap-stable (latest)                    |
| Report File | security/dast-zap-report-2026-04-13.md         |

---

## Executive Summary

| Severity          | Count |
|-------------------|-------|
| 🔴 High            | 0     |
| 🟠 Medium          | 2     |
| 🟡 Low             | 5     |
| ℹ️ Informational   | 1     |
| **Total**         | **8** |

> **Risk Assessment**: MODERATE RISK — 2 medium-severity findings require remediation before production deployment. No critical (High) vulnerabilities were detected. All findings are related to missing HTTP security headers, which are straightforward to fix via NestJS middleware or a reverse proxy configuration.

---

## Findings

### 🟠 Medium Severity

#### Content Security Policy (CSP) Header Not Set (CWE-693)

| Field      | Value                          |
|------------|--------------------------------|
| Risk       | Medium                         |
| WASC ID    | WASC-15                        |
| Instances  | 1                              |
| Sample URL | `http://localhost:3001`        |

**Description**: Content Security Policy (CSP) is an added layer of security that helps detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. The application does not set a `Content-Security-Policy` response header, leaving browsers without a policy to enforce.

**Remediation**: Configure the NestJS application to set the `Content-Security-Policy` header. The recommended approach is to use the `helmet` middleware:

```typescript
// main.ts
import helmet from 'helmet';
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
```

---

#### Missing Anti-Clickjacking Header (CWE-1021)

| Field      | Value                          |
|------------|--------------------------------|
| Risk       | Medium                         |
| WASC ID    | WASC-15                        |
| Instances  | 1                              |
| Sample URL | `http://localhost:3001`        |

**Description**: The response does not protect against Clickjacking attacks. The application does not include either a `Content-Security-Policy` header with a `frame-ancestors` directive or an `X-Frame-Options` header, making it possible for an attacker to embed the application within an `<iframe>` on a malicious page.

**Remediation**: Add the `X-Frame-Options` header via `helmet` (same middleware as above):

```typescript
app.use(helmet({
  frameguard: { action: 'deny' }, // or 'sameorigin'
}));
```

---

### 🟡 Low Severity

#### Cross-Origin-Embedder-Policy Header Missing (CWE-693)

| Field      | Value                          |
|------------|--------------------------------|
| Risk       | Low                            |
| WASC ID    | WASC-14                        |
| Instances  | 1                              |
| Sample URL | `http://localhost:3001`        |

**Description**: The `Cross-Origin-Embedder-Policy` (COEP) header is missing. Without it, documents can load cross-origin resources that do not explicitly grant permission, which may be required for certain browser isolation features (e.g., `SharedArrayBuffer`).

**Remediation**: Add `Cross-Origin-Embedder-Policy: require-corp` via `helmet`:
```typescript
app.use(helmet({ crossOriginEmbedderPolicy: { policy: 'require-corp' } }));
```

---

#### Cross-Origin-Opener-Policy Header Missing (CWE-693)

| Field      | Value                          |
|------------|--------------------------------|
| Risk       | Low                            |
| WASC ID    | WASC-14                        |
| Instances  | 1                              |
| Sample URL | `http://localhost:3001`        |

**Description**: The `Cross-Origin-Opener-Policy` (COOP) header is absent. This allows other origins to access the window object, potentially enabling cross-origin data leaks.

**Remediation**: Add `Cross-Origin-Opener-Policy: same-origin` via `helmet`:
```typescript
app.use(helmet({ crossOriginOpenerPolicy: { policy: 'same-origin' } }));
```

---

#### Permissions Policy Header Not Set (CWE-693)

| Field      | Value                          |
|------------|--------------------------------|
| Risk       | Low                            |
| WASC ID    | WASC-15                        |
| Instances  | 1                              |
| Sample URL | `http://localhost:3001`        |

**Description**: The `Permissions-Policy` header (formerly `Feature-Policy`) is not set. This header restricts which browser features and APIs (camera, microphone, geolocation, etc.) can be used by the page, reducing the attack surface.

**Remediation**:
```typescript
app.use(helmet({ permittedCrossDomainPolicies: false }));
// Or manually set the header:
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});
```

---

#### Server Leaks Information via "X-Powered-By" Header (CWE-497)

| Field      | Value                          |
|------------|--------------------------------|
| Risk       | Low                            |
| WASC ID    | WASC-13                        |
| Instances  | 3                              |
| Sample URL | `http://localhost:3001`        |

**Description**: The server is returning an `X-Powered-By: Express` response header, disclosing the underlying web framework to potential attackers. This information can be used to target known vulnerabilities specific to Express/Node.js.

**Remediation**: NestJS/Express disables this automatically when using `helmet`, or explicitly:
```typescript
app.use(helmet({ hidePoweredBy: true }));
// or
app.getHttpAdapter().getInstance().disable('x-powered-by');
```

---

#### X-Content-Type-Options Header Missing (CWE-693)

| Field      | Value                          |
|------------|--------------------------------|
| Risk       | Low                            |
| WASC ID    | WASC-15                        |
| Instances  | 1                              |
| Sample URL | `http://localhost:3001`        |

**Description**: The `X-Content-Type-Options: nosniff` header is absent. Without it, older browsers may perform MIME-type sniffing on responses, potentially interpreting a response as a different content type (e.g., treating a JSON response as executable script).

**Remediation**:
```typescript
app.use(helmet({ noSniff: true })); // enabled by default in helmet
```

---

### ℹ️ Informational Alerts Summary

| Alert Name                    | CWE     | Instances | Note                                                              |
|-------------------------------|---------|-----------|-------------------------------------------------------------------|
| Storable and Cacheable Content | CWE-524 | 3         | Responses are cacheable; validate no sensitive data is being cached by proxies |

---

## Consolidated Fix: Add `helmet` Middleware

All 7 security header findings can be resolved with a single `helmet` integration in `backend/src/main.ts`:

```typescript
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet()); // Covers: CSP, X-Frame-Options, X-Content-Type-Options,
                    // X-Powered-By removal, COEP, COOP, Permissions-Policy

  await app.listen(process.env.PORT ?? 3001);
}
```

Install: `npm install helmet`

---

## Limitations & Next Steps

- This scan was performed **unauthenticated**. Protected endpoints (requiring JWT Bearer token) were **not exercised** by the spider. Vulnerabilities behind authentication (e.g., IDOR, privilege escalation, injection in authenticated routes) were not tested.
  - To include authenticated paths: re-run after injecting a token via ZAP Replacer or context authentication config.
- The baseline scan visited only **3 URLs** (the spider found limited depth from the root). A `full` scan or an `api` scan using an OpenAPI definition would provide broader coverage of all `/auth/*`, `/appointments/*`, `/schedule/*` endpoints.
- Run `/teste-sec-dast-zap http://localhost:3001 api` once a Swagger/OpenAPI spec is available (add `@nestjs/swagger` to expose `/api-json`).
- This report complements, but does not replace, manual penetration testing and a threat model review.

---

## Artefacts

| File                                        | Description               |
|---------------------------------------------|---------------------------|
| `security/zap-results.json`                 | Raw ZAP JSON output       |
| `security/zap-report.html`                  | Full HTML report from ZAP |
| `security/dast-zap-report-2026-04-13.md`    | This report               |
