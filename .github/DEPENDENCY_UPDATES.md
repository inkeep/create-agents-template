# Automated Dependency Updates

This repository uses **Renovate Bot** to automatically keep @inkeep packages up to date.

## 🚀 Quick Setup

1. **Install Renovate App**: Visit https://github.com/apps/renovate and install it on this repository
2. **Merge Onboarding PR**: Renovate will create an onboarding PR - review and merge it
3. **Done!** Renovate will now automatically create PRs when new @inkeep packages are published

The configuration is already set up in `.github/renovate.json`.

## 🤖 How It Works

Renovate automatically:
- ✅ Detects new versions of @inkeep packages
- ✅ Groups minor/patch updates into a single PR
- ✅ Separates major updates (breaking changes) into dedicated PRs with warnings
- ✅ Includes semantic versioning information in PR descriptions
- ✅ Runs during business hours (9am-5pm PT weekdays)
- ✅ Works seamlessly with pnpm workspaces

### What PRs Look Like

**Regular Updates (minor/patch):**
```
Title: chore(deps): Update @inkeep packages

Body:
🤖 This PR updates all @inkeep packages to their latest versions.

Updated Packages:
- @inkeep/agents-core: 0.12.1 → 0.12.2
- @inkeep/agents-sdk: 0.12.1 → 0.12.2
...
```

**Major Updates (breaking changes):**
```
Title: chore(deps): Update @inkeep packages (major)

Body:
⚠️ Major Version Update - This may contain breaking changes!
Please carefully review the changelog before merging.
```

## ⚙️ Customization

All configuration is in `.github/renovate.json`. Here are common customizations:

### Change Schedule

```json
{
  "schedule": ["after 10pm every weekday"]
}
```

**Options:** `"at any time"`, `"after 10pm every weekday"`, `"on friday"`, `"every weekend"`

### Enable Auto-merge for Patches

```json
{
  "packageRules": [
    {
      "matchPackagePatterns": ["^@inkeep/"],
      "matchUpdateTypes": ["patch"],
      "automerge": true
    }
  ]
}
```

### Add Required Reviewers

```json
{
  "packageRules": [
    {
      "matchPackagePatterns": ["^@inkeep/"],
      "reviewers": ["your-github-username"],
      "assignees": ["your-github-username"]
    }
  ]
}
```

### Exclude Specific Packages

```json
{
  "packageRules": [
    {
      "matchPackageNames": ["@inkeep/package-to-exclude"],
      "enabled": false
    }
  ]
}
```

## 🛠️ Troubleshooting

**Renovate not creating PRs?**
- Ensure the Renovate app is installed: https://github.com/apps/renovate
- Check **Dependency Graph** → **Renovate** for logs
- Verify config with: `npx renovate-config-validator .github/renovate.json`

**Manually trigger Renovate:**
Go to **Dependency Graph** → **Renovate** → **"Check for updates"**

## 📚 Resources

- [Renovate Documentation](https://docs.renovatebot.com/)
- [Configuration Options](https://docs.renovatebot.com/configuration-options/)

