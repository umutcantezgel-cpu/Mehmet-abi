# Service Level Objectives (SLOs)

**Project**: Memo-BauT Website
**Owner**: Engineering Team
**Last Updated**: 2025-11-13

---

## Overview

Service Level Objectives (SLOs) define measurable targets for service quality. These are NOT Service Level Agreements (SLAs) with external penalties, but internal quality targets.

---

## 1. Availability

### SLO Target

**99.9% uptime** (measured over 30-day rolling window)

- **Allowed downtime**: ~43 minutes per month
- **Measurement**: Uptime monitoring ping every 60 seconds
- **Excludes**: Planned maintenance (with 24h notice)

### Measurement

```bash
# Uptime percentage
Uptime % = (Total Time - Downtime) / Total Time × 100

# Error budget
Error Budget = (1 - 0.999) × 30 days = 43.2 minutes/month
```

### Monitoring

- **Tool**: Netlify Analytics + External uptime monitor (e.g., UptimeRobot)
- **Alert**: < 99.5% in rolling 24h window
- **Dashboard**: Netlify Dashboard → Analytics

### Breach Response

1. Investigate root cause
2. Implement fix or rollback
3. Post-mortem within 48h
4. Update runbook if needed

---

## 2. Performance (Core Web Vitals)

### SLO Targets (75th percentile, mobile)

| Metric | Target | Max | Alert Threshold |
|--------|--------|-----|----------------|
| **LCP** (Largest Contentful Paint) | ≤ 1.8s | ≤ 2.5s | > 2.5s |
| **INP** (Interaction to Next Paint) | ≤ 150ms | ≤ 200ms | > 200ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.08 | ≤ 0.1 | > 0.1 |
| **FCP** (First Contentful Paint) | ≤ 1.2s | ≤ 1.8s | > 1.8s |
| **TTFB** (Time to First Byte) | ≤ 600ms | ≤ 800ms | > 800ms |

### Measurement

- **Tool**: Google PageSpeed Insights API (automated daily)
- **Frequency**: Daily @ 06:00 UTC
- **Pages**: Homepage, /leistungen, /kontakt
- **Device**: Mobile (Moto G4)

### Monitoring

```javascript
// Web Vitals reporting (client-side)
import {onLCP, onINP, onCLS} from 'web-vitals';

onLCP(metric => sendToAnalytics(metric));
onINP(metric => sendToAnalytics(metric));
onCLS(metric => sendToAnalytics(metric));
```

### Breach Response

1. **Alert**: If p75 > max for 3 consecutive days
2. **Action**: Performance audit + optimization sprint
3. **Review**: Weekly performance dashboard

---

## 3. Accessibility

### SLO Target

**Zero critical accessibility violations** (WCAG 2.2 AA)

- **Tools**: Axe + Pa11y
- **Automated**: CI/CD on every deployment
- **Manual**: Quarterly audit

### Severity Levels

| Level | Definition | SLO |
|-------|------------|-----|
| **Critical** | Blocks screen reader usage | 0 violations |
| **Serious** | Major usability issue | ≤ 2 violations |
| **Moderate** | Minor usability issue | ≤ 10 violations |

### Measurement

- **Automated**: Every PR via GitHub Actions
- **Manual**: Quarterly review with screen reader
- **Tool**: axe DevTools + NVDA/VoiceOver

### Breach Response

- **Critical**: Block deployment, fix immediately
- **Serious**: Fix within 1 sprint
- **Moderate**: Fix within 2 sprints

---

## 4. Security

### SLO Targets

- **Security Headers**: Grade A (securityheaders.com)
- **Vulnerabilities**: Zero high/critical npm vulnerabilities
- **HTTPS**: 100% of requests over HTTPS
- **CSP Violations**: < 10/day (monitored via report-uri)

### Measurement

- **Headers**: Automated check in CI/CD
- **Vulnerabilities**: `npm audit` on every build
- **CSP**: Report-Only mode for 7 days, then strict

### Monitoring

```bash
# Weekly security scan
npm audit --audit-level=high

# CSP violation monitoring
# Configured in _headers with report-uri
```

### Breach Response

- **High/Critical vulns**: Patch within 24h
- **Headers downgrade**: Investigate + fix within 1 week
- **CSP violations**: Review + tighten policy

---

## 5. Incident Response Time

### SLO Targets

| Severity | Acknowledge | Resolution |
|----------|------------|------------|
| **P0** (Site down) | < 15 min | < 2 hours |
| **P1** (Major degradation) | < 30 min | < 4 hours |
| **P2** (Minor issue) | < 2 hours | < 24 hours |
| **P3** (Non-urgent) | < 24 hours | < 1 week |

### On-Call Rotation

- **Primary**: Engineering lead
- **Secondary**: DevOps engineer
- **Escalation**: CTO

---

## 6. Deployment Frequency & Success Rate

### SLO Targets

- **Deployment Success Rate**: ≥ 95%
- **Rollback Time**: < 5 minutes
- **Mean Time to Deploy**: < 3 minutes

### Measurement

- **Success**: Deployment passed all quality gates
- **Failure**: Rollback required or quality gate block

### Monitoring

- **Tool**: GitHub Actions metrics
- **Dashboard**: Netlify deployment history

---

## Alert Channels

| Type | Channel |
|------|---------|
| P0/P1 | PagerDuty + SMS |
| P2/P3 | Slack #alerts |
| Performance | Email digest (daily) |
| Security | Slack #security |

---

## Reporting

### Weekly Report

- Availability %
- Core Web Vitals trends (p50, p75, p95)
- Failed deployments
- Security scan results

### Monthly Report

- SLO compliance summary
- Incident post-mortems
- Improvement recommendations

---

## Continuous Improvement

### Quarterly Review

1. Analyze SLO breaches
2. Adjust targets if needed (tighten/relax)
3. Update monitoring tools
4. Team retro on ops quality

### Success Metrics

- **Target**: 95% SLO achievement rate
- **Stretch**: 99% SLO achievement rate

---

## References

- [Core Web Vitals](https://web.dev/vitals/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Security Headers Best Practices](https://securityheaders.com/)
