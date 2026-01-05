# Environment Variables Setup

This document describes the environment variables needed for the event creation system.

## Local Development (.env file)

Create a `.env` file in the root of the `apps/unjoe-portfolio/` directory with the following variables:

```bash
# Event Creation Form Password
# This password protects the /create-event form
EVENT_FORM_PASSWORD=your-secure-password-here

# Google Places API Key (for venue autocomplete)
# Get this from Google Cloud Console - Enable Places API
PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXX

# GitHub Personal Access Token (for Worker to create PRs)
# Create at: https://github.com/settings/tokens
# Scopes needed: repo (full control of private repositories)
GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Cloudflare Worker Secrets

The Cloudflare Worker needs access to these secrets. Set them via:

```bash
# Using wrangler CLI
cd apps/unjoe-portfolio/worker
wrangler secret put GITHUB_TOKEN
wrangler secret put EVENT_FORM_PASSWORD
```

Or via the Cloudflare Dashboard:
- Workers & Pages → Your Worker → Settings → Variables → Add Variable

### Required Worker Secrets:

1. **GITHUB_TOKEN**
   - GitHub Personal Access Token with `repo` scope
   - Used to create branches, commit files, and create pull requests
   - Generate at: https://github.com/settings/tokens

2. **EVENT_FORM_PASSWORD**
   - Same password as used in the Astro site
   - Optional: Could be different for added security
   - Worker can validate submissions came from authenticated session

## API Keys Setup Guide

### 1. Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the **Places API**
4. Go to Credentials → Create Credentials → API Key
5. Restrict the API key:
   - **Application restrictions**: HTTP referrers
   - **API restrictions**: Restrict to Places API only
   - **Allowed referrers**:
     - `https://jack.unjoe.me/*`
     - `http://localhost:*` (for development)

**Cost:** ~$0.017 per autocomplete session (very low for typical usage)

### 2. GitHub Personal Access Token

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Name: "ElShaddai Event Form Worker"
4. Select scopes:
   - ✅ **repo** (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** - you won't be able to see it again

**Security Notes:**
- Store this token securely
- Never commit it to the repository
- Rotate it periodically (every 6-12 months)
- Use Cloudflare Worker secrets, not environment variables

## Testing Locally

1. Copy `.env.example` to `.env`
2. Fill in all the values
3. Run `npm run dev`
4. Visit `http://localhost:4321/create-event`
5. Enter the password you set in `EVENT_FORM_PASSWORD`
6. Test the form with real venue searches

## Deployment Checklist

Before deploying to production:

- [ ] Google Places API key is set in `.env` (prefixed with `PUBLIC_`)
- [ ] Event form password is set in `.env`
- [ ] GitHub token is stored in Cloudflare Worker secrets (via `wrangler secret put`)
- [ ] Event form password is stored in Cloudflare Worker secrets
- [ ] Google Places API key has proper restrictions (HTTP referrers)
- [ ] GitHub token has only `repo` scope (nothing more)
- [ ] All secrets are excluded from git (`.env` in `.gitignore`)

## Troubleshooting

### "No details available for input" error
- Google Places API key is missing or invalid
- Check browser console for API errors
- Verify API key restrictions allow your domain

### "GitHub API error" after form submission
- GitHub token is missing or invalid
- Token doesn't have `repo` scope
- Check Worker logs in Cloudflare dashboard

### "Password incorrect"
- Password mismatch between `.env` and form input
- Check for typos, trailing spaces
- Cookie might be stale (clear browser cookies)

## Security Best Practices

1. **Rotate secrets regularly**
   - GitHub tokens: Every 6-12 months
   - Form password: Every 3-6 months

2. **Monitor usage**
   - Check GitHub token activity for unauthorized use
   - Monitor Google Places API usage for unexpected spikes

3. **Use strong passwords**
   - Event form password should be 20+ characters
   - Use a password manager

4. **Restrict API keys**
   - Google Places: HTTP referrers only
   - GitHub: Minimal scopes needed

5. **Audit logs**
   - Review Worker logs periodically
   - Check GitHub repository activity
