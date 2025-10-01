# 🚀 Quick Setup Guide for Automated Dependency Updates

Follow these steps to enable automated @inkeep package updates using Renovate Bot.

## Step 1: Install Renovate App

1. Visit https://github.com/apps/renovate
2. Click **"Install"** or **"Configure"** if already installed
3. Select **"Only select repositories"** and choose: `inkeep/create-agents-template`
4. Click **"Install"** or **"Save"**

## Step 2: Verify Installation

Within a few minutes, Renovate will:
- Scan your repository for dependencies
- Create an onboarding PR (if this is the first time)
- Start monitoring for @inkeep package updates

## Step 3: Merge Onboarding PR

1. Review the onboarding PR created by Renovate
2. Merge it to activate Renovate

## Step 4: Test It Works

You can manually trigger Renovate by:
1. Going to the **Dependency Graph** section in your repo
2. Clicking **"Renovate"** in the sidebar
3. Viewing the logs or clicking **"Check for updates"**

## 📝 What Happens Next?

### For Minor/Patch Updates

When new versions are released (e.g., 0.12.1 → 0.12.2):

1. Renovate or GitHub Actions detects the update
2. A PR is automatically created with:
   - Updated package.json files
   - Updated pnpm-lock.yaml
   - List of changes
   - Links to changelogs
3. Review the PR
4. Run tests (if configured)
5. Merge when ready

### For Major Updates

When breaking changes are released (e.g., 0.12.0 → 1.0.0):

1. A **separate** PR is created labeled with `major-update`
2. The PR includes warnings about potential breaking changes
3. Review carefully:
   - Check the changelog for breaking changes
   - Look for migration guides
   - Test thoroughly in a staging environment
4. Merge only after thorough testing

## 🔧 Customization

### Change Update Schedule

Edit `.github/renovate.json`:

```json
{
  "schedule": ["after 10pm every weekday"]
}
```

Options:
- `"at any time"` - As soon as updates are available
- `"after 10pm every weekday"` - Only evenings
- `"on friday"` - Once a week
- `"every weekend"` - Saturdays and Sundays

### Enable Auto-merge (for patch updates only)

Add to `.github/renovate.json`:

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

Edit `.github/renovate.json`:

```json
{
  "packageRules": [
    {
      "matchPackagePatterns": ["^@inkeep/"],
      "reviewers": ["your-github-username"]
    }
  ]
}
```

## ✅ Verification Checklist

- [ ] Renovate app installed on repository
- [ ] Onboarding PR merged
- [ ] Configuration validated (check Actions tab for validation workflow)
- [ ] Labels created (`dependencies`, `inkeep-packages`, `major-update`)
- [ ] Test that Renovate can be manually triggered
- [ ] First update PR received and reviewed

## 🆘 Need Help?

- **Renovate not creating PRs?** Check the [troubleshooting guide](DEPENDENCY_UPDATES.md#-troubleshooting)
- **Want to customize behavior?** See the [full documentation](DEPENDENCY_UPDATES.md)
- **Configuration issues?** The validation workflow will check your config automatically

## 📚 Additional Resources

- [Renovate Documentation](https://docs.renovatebot.com/)
- [Renovate Configuration Options](https://docs.renovatebot.com/configuration-options/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

