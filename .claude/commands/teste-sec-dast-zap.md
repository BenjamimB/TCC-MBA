---
description: Run OWASP ZAP DAST scan against a running application and generate a vulnerability report
allowed-tools: Bash, Read, Write, Glob
argument-hint: [target-url] [scan-type: baseline|full|api]
---

# OWASP ZAP DAST Security Scan

<background_information>
- **Mission**: Execute a Dynamic Application Security Testing (DAST) scan using OWASP ZAP against a running application and produce a structured vulnerability report
- **Success Criteria**:
  - ZAP scan completes without infrastructure errors
  - All discovered alerts are classified by severity (High / Medium / Low / Informational)
  - A Markdown report is saved to `security/` with findings, evidence, and remediation guidance
  - A concise summary is displayed in the terminal
- **Scan Types**:
  - `baseline` (default) — passive scan + limited active probe; fast (~2 min); safe for CI
  - `full` — spider + full active scan; thorough but slower (~10–20 min); may trigger rate limits
  - `api` — API-optimised scan using OpenAPI/Swagger spec; best for REST backends
- **Risk Code Mapping** (ZAP internal): 0 = Informational, 1 = Low, 2 = Medium, 3 = High
</background_information>

<instructions>

## Arguments

| Argument | Default                  | Description                          |
|----------|--------------------------|--------------------------------------|
| `$1`     | `http://localhost:3000`  | Target URL to scan                   |
| `$2`     | `baseline`               | Scan type: `baseline`, `full`, `api` |

Resolve defaults before any step:
- `TARGET` = `$1` if provided, else `http://localhost:3000`
- `SCAN_TYPE` = `$2` if provided, else `baseline`

---

## Step 1 — Pre-flight Checks

### 1a. Verify Docker is available
```bash
docker version --format '{{.Server.Version}}' 2>&1
```
If this fails, stop and output:
> **Error**: Docker is not available. Install Docker Desktop or Docker Engine before running this skill.

### 1b. Verify target is reachable
```bash
curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "$TARGET" 2>&1
```
If the HTTP status code is `000` (connection refused / timeout), stop and output:
> **Error**: Target `$TARGET` is not reachable. Start the application first (e.g., `cd backend && npm run start:dev`).

### 1c. Create output directory
```bash
mkdir -p security
```

---

## Step 2 — Pull ZAP Image (if not cached)

```bash
docker pull zaproxy/zap-stable 2>&1 | tail -5
```

---

## Step 3 — Run ZAP Scan

Use `--network=host` so the ZAP container can reach a locally-running application.  
Mount `./security` to `/zap/wrk` so output files land on the host.  
Use `-I` to prevent non-zero exit codes from ZAP alert thresholds from failing the command.

### Baseline scan
```bash
docker run --rm \
  --network=host \
  -v "$(pwd)/security:/zap/wrk/:rw" \
  zaproxy/zap-stable \
  zap-baseline.py \
  -t "$TARGET" \
  -J zap-results.json \
  -r zap-report.html \
  -I 2>&1
```

### Full scan
```bash
docker run --rm \
  --network=host \
  -v "$(pwd)/security:/zap/wrk/:rw" \
  zaproxy/zap-stable \
  zap-full-scan.py \
  -t "$TARGET" \
  -J zap-results.json \
  -r zap-report.html \
  -I 2>&1
```

### API scan (OpenAPI/Swagger)
First, detect if a Swagger spec is available:
```bash
curl -s -o /dev/null -w "%{http_code}" "$TARGET/api-json" 2>&1
```
If `200`, use `-f "$TARGET/api-json"` as the spec source. Otherwise use `-t "$TARGET"` without a spec file.

```bash
docker run --rm \
  --network=host \
  -v "$(pwd)/security:/zap/wrk/:rw" \
  zaproxy/zap-stable \
  zap-api-scan.py \
  -t "$TARGET/api-json" \
  -f openapi \
  -J zap-results.json \
  -r zap-report.html \
  -I 2>&1
```

Choose the correct command based on `SCAN_TYPE`. Run the chosen command and capture stdout/stderr.  
If Docker exits with a non-zero code AND `security/zap-results.json` does not exist, stop and report the Docker error.

---

## Step 4 — Parse JSON Results

After the scan completes, read `security/zap-results.json`. Parse it with the following Python inline script to extract structured findings. Run via Bash:

```bash
python3 - <<'PYEOF'
import json, sys, os

results_path = "security/zap-results.json"
if not os.path.exists(results_path):
    print("NO_RESULTS_FILE")
    sys.exit(1)

with open(results_path) as f:
    data = json.load(f)

risk_labels = {"3": "High", "2": "Medium", "1": "Low", "0": "Informational"}
counts = {"3": 0, "2": 0, "1": 0, "0": 0}
alerts_by_risk = {"3": [], "2": [], "1": [], "0": []}

sites = data.get("site", [])
for site in sites:
    for alert in site.get("alerts", []):
        rc = alert.get("riskcode", "0")
        counts[rc] = counts.get(rc, 0) + 1
        alerts_by_risk.setdefault(rc, []).append(alert)

total = sum(counts.values())
print(f"TOTAL:{total}")
for rc in ["3","2","1","0"]:
    print(f"{risk_labels[rc].upper()}:{counts[rc]}")

# Emit structured findings
for rc in ["3","2","1","0"]:
    for a in alerts_by_risk[rc]:
        name = a.get('name','').replace('|','/')
        risk = risk_labels.get(rc,'Unknown')
        cwe = a.get('cweid','-')
        wasc = a.get('wascid','-')
        desc = a.get('desc','').replace('\n',' ').strip()[:300]
        solution = a.get('solution','').replace('\n',' ').strip()[:300]
        instances = a.get('instances',[])
        url_sample = instances[0].get('uri','') if instances else ''
        count = a.get('count','1')
        print(f"ALERT|{risk}|{name}|{cwe}|{wasc}|{count}|{url_sample}|{desc}|{solution}")
PYEOF
```

Capture the output of this script for report generation.

---

## Step 5 — Generate Markdown Report

Determine the report timestamp:
```bash
date -u +"%Y-%m-%dT%H:%M:%SZ"
```

Determine the report filename: `security/dast-zap-report-<YYYY-MM-DD>.md`

Build the Markdown report using the parsed data from Step 4 and write it to the report file.

### Report structure

```markdown
# DAST Security Report — OWASP ZAP

| Field        | Value                                      |
|--------------|--------------------------------------------|
| Target       | <TARGET>                                   |
| Scan Type    | <SCAN_TYPE>                                |
| Date         | <ISO timestamp>                            |
| ZAP Version  | zaproxy/zap-stable (latest)                |
| Report File  | security/dast-zap-report-<date>.md         |

---

## Executive Summary

| Severity      | Count |
|---------------|-------|
| 🔴 High        | N     |
| 🟠 Medium      | N     |
| 🟡 Low         | N     |
| ℹ️ Informational | N  |
| **Total**     | **N** |

> **Risk Assessment**: [choose one based on High/Medium counts]
> - 0 High, 0 Medium → LOW RISK — no critical findings
> - 0 High, >0 Medium → MODERATE RISK — medium findings need remediation
> - >0 High → HIGH RISK — critical findings require immediate attention

---

## Findings

### 🔴 High Severity

[For each High alert:]
#### [Alert Name] (CWE-[id])

| Field     | Value                        |
|-----------|------------------------------|
| Risk      | High                         |
| WASC ID   | WASC-[id]                    |
| Instances | [count]                      |
| Sample URL| `[url]`                      |

**Description**: [desc]

**Remediation**: [solution]

---

[Repeat sections for Medium, Low, Informational — collapse Informational into a summary table instead of individual entries]

---

## Informational Alerts Summary

| Alert Name | CWE | Instances |
|------------|-----|-----------|
| ...        | ... | ...       |

---

## Limitations & Next Steps

- This scan was performed **unauthenticated**. Protected endpoints (requiring JWT) were not deeply tested.
  To include authenticated paths: re-run with a valid bearer token injected via ZAP context or the `-config replacer.full_list(0).description=auth ...` flag.
- For a more thorough assessment of authenticated API endpoints, consider running the `api` scan type with a Swagger/OpenAPI definition.
- Findings marked Informational or Low should be reviewed in context — not all require immediate action.
- This report complements, but does not replace, manual penetration testing.

---

## Artefacts

| File                              | Description              |
|-----------------------------------|--------------------------|
| `security/zap-results.json`       | Raw ZAP JSON output      |
| `security/zap-report.html`        | Full HTML report from ZAP|
| `security/dast-zap-report-<date>.md` | This report           |
```

Write the completed report to `security/dast-zap-report-<YYYY-MM-DD>.md`.

---

## Step 6 — Display Terminal Summary

After writing the report, output to the user:

```
## DAST Scan Complete

Target  : <TARGET>
Type    : <SCAN_TYPE>
Alerts  : <TOTAL> total  |  High: N  Medium: N  Low: N  Info: N

Report saved to: security/dast-zap-report-<date>.md
HTML report   : security/zap-report.html
Raw JSON      : security/zap-results.json
```

If High > 0, add:
> ⚠️ **Action required**: N high-severity finding(s) detected. Review the report and apply remediations before deployment.

If Total == 0, add:
> ✅ No alerts found. The application passed the ZAP baseline scan.

---

## Constraints

- Never modify application source code or test data as part of this scan
- Do not commit `security/zap-results.json` or `security/zap-report.html` to version control (they may be large or contain sensitive endpoint details); recommend adding `security/zap-*.json` and `security/zap-*.html` to `.gitignore`
- The scan uses passive + active probing which may create test records in the database; run against a dedicated test/staging environment when possible
- Respect the `$2` argument strictly — do not escalate from `baseline` to `full` without explicit user instruction

</instructions>

## Tool Guidance

- Use **Bash** for all Docker commands, curl pre-flight checks, Python script execution, and directory creation
- Use **Write** to save the Markdown report file
- Use **Read** only if you need to inspect existing output files for debugging
- Do not use WebSearch or WebFetch — all required tooling runs locally via Docker

## Output Description

1. Pre-flight check results (pass/fail)
2. Live scan progress (Docker stdout, last 10 lines)
3. Parsed findings summary table
4. Confirmation that the Markdown report was written (path)
5. Terminal summary block (Step 6)

## Safety & Fallback

### Docker not available
Stop immediately. Suggest installing Docker. Do not attempt to run ZAP any other way.

### Target not reachable
Stop immediately. Do not start a scan against an unreachable host — ZAP will hang or produce empty results.

### `zap-results.json` missing after scan
The scan may have failed silently (e.g., invalid target, network error). Show the last 20 lines of Docker output and stop. Do not generate an empty report.

### Python not available
Fallback: read `security/zap-results.json` with the Read tool and manually extract findings using Bash + grep/jq if jq is available.

### Scan produces 0 alerts
This is a valid result. Write the report with an empty findings section and a green summary. Do not re-run or escalate scan type automatically.
