# Incident Response Runbook

**Project**: Memo-BauT Website
**Last Updated**: 2025-11-13

---

## Quick Reference

| Severity | Response Time | Escalation | Examples |
|----------|--------------|------------|----------|
| **P0** | < 15 min | Immediate | Site completely down |
| **P1** | < 30 min | Within 1h | Major features broken |
| **P2** | < 2 hours | Next business day | Minor bugs, slow performance |
| **P3** | < 24 hours | None | UI glitches, typos |

---

## P0: Site Down

### Symptoms

- ✅ Homepage returns 500/503 error
- ✅ DNS not resolving
- ✅ All pages inaccessible
- ✅ Uptime monitor shows down

### Immediate Actions (< 15 minutes)

1. **Acknowledge incident**
   ```bash
   # Post in #incidents Slack channel
   🚨 P0 INCIDENT: Site down - investigating
   ```

2. **Check Netlify status**
   - Visit: https://www.netlifystatus.com/
   - Check deployment logs
   - Check DNS settings

3. **Quick rollback** (if recent deployment)
   ```bash
   # Via Netlify Dashboard:
   # Deployments → [Previous successful build] → "Publish deploy"
   # Expected time: < 2 minutes
   ```

4. **Update status page**
   ```markdown
   We're experiencing technical difficulties.
   Our team is working on it.
   ETA: [time]
   ```

### Investigation

- Check error logs in Netlify
- Review recent commits/deployments
- Test locally: `npm run build && npm run preview`
- Check external dependencies (fonts.googleapis.com, etc.)

### Resolution

- **If build issue**: Fix + redeploy
- **If Netlify issue**: Wait for platform recovery
- **If DNS issue**: Contact registrar

### Post-Incident

1. ✅ Post-mortem within 24h
2. ✅ Update runbook if needed
3. ✅ Notify stakeholders
4. ✅ Review monitoring alerts

---

## P1: Major Feature Broken

### Examples

- Contact form not submitting
- Navigation broken on mobile
- Images not loading
- CSP blocking critical resources

### Response (< 30 minutes)

1. **Assess impact**
   ```bash
   # How many users affected?
   # Which pages/features?
   # Workaround available?
   ```

2. **Temporary fix**
   - Add notice to affected page
   - Redirect to alternative
   - Disable feature if needed

3. **Root cause analysis**
   ```bash
   # Check browser console errors
   # Review recent changes
   # Test on different devices
   ```

### Common Scenarios

#### Contact Form Not Working

**Symptoms**: Form submits but no confirmation

**Check**:
```bash
# Netlify Forms settings
# Site settings → Forms
# Verify form-name attribute matches
```

**Fix**:
```html
<!-- Ensure form has these attributes -->
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
  ...
</form>
```

#### CSP Blocking Resources

**Symptoms**: Console shows CSP violation errors

**Quick fix**:
```bash
# Edit public/_headers
# Temporarily relax CSP directive
# Deploy
# Investigate proper fix
```

**Proper fix**:
```
Content-Security-Policy:
  script-src 'self' 'nonce-{RANDOM}';
  # Add nonce to inline scripts
```

---

## P2: Performance Degradation

### Symptoms

- LCP > 3 seconds
- Slow page loads
- High bounce rate
- Lighthouse score < 90

### Investigation

1. **Run Lighthouse audit**
   ```bash
   npx lighthouse https://www.memobaut.de \
     --view \
     --preset=desktop \
     --output=html
   ```

2. **Check Network tab** (DevTools)
   - Slow resources?
   - Render-blocking?
   - Large images?

3. **Analyze Web Vitals**
   - Check PageSpeed Insights
   - Review RUM data (if available)

### Common Fixes

#### Large Images
```bash
# Optimize with scripts/optimize-images.sh
./scripts/optimize-images.sh

# Or manual:
cwebp -q 85 image.png -o image.webp
```

#### Render-Blocking Resources
```html
<!-- Defer non-critical CSS -->
<link rel="preload" href="/styles/critical.css" as="style">
<link rel="stylesheet" href="/styles/critical.css">

<!-- Defer JS -->
<script src="/script.js" defer></script>
```

#### Unoptimized Fonts
```css
/* Use font-display: swap */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2');
  font-display: swap;
}
```

---

## P3: Minor Issues

### Examples

- Typos
- Broken anchor links
- Minor UI glitches
- Analytics not tracking

### Response (< 24 hours)

1. Create issue in GitHub
2. Add to next sprint
3. Fix in normal workflow

---

## Rollback Procedures

### Via Netlify Dashboard (Fastest)

1. Go to: Deployments
2. Find last successful deploy
3. Click "Publish deploy"
4. Confirm

**Time**: < 2 minutes

### Via Git (If Netlify unavailable)

```bash
# Revert last commit
git revert HEAD
git push

# Or force push to previous commit (DANGEROUS)
git reset --hard HEAD~1
git push --force
```

**Time**: < 5 minutes

---

## Emergency Contacts

| Role | Name | Contact |
|------|------|---------|
| **Primary** | Engineering Lead | [phone] |
| **Secondary** | DevOps | [phone] |
| **Escalation** | CTO | [phone] |
| **Netlify Support** | | support@netlify.com |

---

## Communication Templates

### Internal (Slack #incidents)

```
🚨 [P0/P1/P2] INCIDENT

**Issue**: [Brief description]
**Impact**: [User-facing impact]
**Status**: Investigating / Mitigating / Resolved
**ETA**: [Estimated resolution time]
**Owner**: @username

**Updates**:
- [timestamp] Action taken
- [timestamp] Current status
```

### External (Status page / Email)

```
We're currently experiencing issues with [feature/service].

Our team is actively working on a resolution.

Affected: [Specific features/pages]
Status: [Investigating/Resolving]
ETA: [Time]

We apologize for the inconvenience.
```

---

## Post-Incident Review Template

### Incident Summary

- **Date/Time**:
- **Duration**:
- **Severity**:
- **Impact**:

### Timeline

- **[time]** - Incident detected
- **[time]** - Response initiated
- **[time]** - Root cause identified
- **[time]** - Fix deployed
- **[time]** - Incident resolved

### Root Cause

[Detailed explanation]

### Contributing Factors

- [Factor 1]
- [Factor 2]

### Resolution

[What was done to fix it]

### Prevention

**Immediate**:
- [ ] [Action item 1]
- [ ] [Action item 2]

**Long-term**:
- [ ] [Process improvement]
- [ ] [Monitoring enhancement]

### Lessons Learned

- [Lesson 1]
- [Lesson 2]

---

## Monitoring & Alerts

### Uptime Monitoring

- **Tool**: Netlify Analytics + External
- **Check interval**: 60 seconds
- **Alert threshold**: 2 failed checks

### Performance Monitoring

- **Tool**: Lighthouse CI
- **Frequency**: Every deployment
- **Alert**: LCP > 2.5s for 3 consecutive days

### Error Tracking

- **Tool**: Browser console errors (planned)
- **Alert**: > 10 errors/hour on homepage

---

## Testing Runbook Updates

**Quarterly**: Run through this runbook with a simulated incident

**After each incident**: Update runbook based on learnings

**Version control**: Track changes in Git

---

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [SLOs](./SLOs.md)
- [Monitoring Dashboard](https://app.netlify.com/)
