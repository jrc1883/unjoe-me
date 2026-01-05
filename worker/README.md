# Event Creation Worker

Cloudflare Worker that handles event submissions from the `/create-event` form and creates GitHub Pull Requests automatically.

## Features

- Receives event form submissions via POST
- Validates required event data
- Generates markdown files with proper frontmatter
- Creates GitHub branches automatically
- Commits event files via GitHub API
- Creates Pull Requests with detailed descriptions
- Returns PR URL for user confirmation

## Setup

### 1. Install Dependencies

```bash
cd worker
npm install
```

### 2. Configure Wrangler

Update `wrangler.toml` with your Cloudflare account details:

```toml
account_id = "your-account-id-here"
```

Get your account ID from the Cloudflare dashboard.

### 3. Set Secrets

The worker requires two secrets:

```bash
# Set GitHub Personal Access Token
wrangler secret put GITHUB_TOKEN

# Set event form password (optional)
wrangler secret put EVENT_FORM_PASSWORD
```

**GitHub Token Requirements:**
- Scopes: `repo` (full control of private repositories)
- Generate at: https://github.com/settings/tokens

### 4. Deploy

**Development:**
```bash
npm run dev
# Worker runs at http://localhost:8787
```

**Production:**
```bash
npm run deploy:prod
```

## Routing

The worker needs to be accessible at `/api/create-event` on your domain.

### Option 1: Cloudflare Pages Function

Move worker to Pages Functions directory:
```bash
# Copy worker to Pages Functions
cp worker/src/index.ts functions/api/create-event.ts
```

Pages will automatically route `https://jack.unjoe.me/api/create-event` to this function.

### Option 2: Worker Route

Configure a route in `wrangler.toml`:

```toml
routes = [
  { pattern = "jack.unjoe.me/api/create-event", zone_name = "unjoe.me" }
]
```

### Option 3: Custom Subdomain

Use a dedicated subdomain:

```toml
route = "api.jack.unjoe.me/*"
```

Then update the form to POST to `https://api.jack.unjoe.me/create-event`.

## API

### POST /create-event

Creates a new event via GitHub PR.

**Content-Type:** `multipart/form-data`

**Required Fields:**
- `title` (string) - Event title
- `date` (string) - ISO 8601 datetime
- `venue` (string) - Venue name
- `location` (string) - City, State format

**Optional Fields:**
- `address` (string) - Full venue address
- `description` (string) - Event description
- `ticketUrl` (string) - Ticket purchase URL
- `ticketType` (string) - Pricing info (e.g., "Free", "$15")
- `featured` (boolean) - Featured event flag
- `eventType` (string) - Event type (default: "upcoming")
- `displayDate` (string) - Human-readable date
- `time` (string) - Human-readable time
- `customImage` (file) - Custom event image (TODO: implement upload)

**Success Response (200):**
```json
{
  "success": true,
  "pr_url": "https://github.com/jrc1883/elshaddai/pull/123",
  "pr_number": 123,
  "branch": "event/2025-09-14-blue-note-chicago",
  "message": "Event submitted successfully! Joseph will review and publish it."
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Missing required fields: title, date, venue, location",
  "details": "..."
}
```

## Workflow

1. User fills out form at `/create-event`
2. Form POSTs to `/api/create-event`
3. Worker validates data
4. Worker generates markdown file
5. Worker creates GitHub branch (e.g., `event/2025-09-14-venue-name`)
6. Worker commits file to `apps/unjoe-portfolio/src/content/events/`
7. Worker creates Pull Request
8. Worker returns PR URL to user
9. Cloudflare Pages automatically creates preview deploy
10. Joseph reviews PR (mobile or desktop)
11. Merge → Cloudflare Pages auto-deploys in 2-3 minutes

## File Naming

**Branch:** `event/YYYY-MM-DD-venue-slug`
- Example: `event/2025-09-14-blue-note-chicago`

**File:** `title-slug.md`
- Example: `live-jazz-at-blue-note-chicago.md`
- Location: `apps/unjoe-portfolio/src/content/events/`

## Generated PR Format

Pull Requests include:

- **Title:** `New Event: [Event Title]`
- **Body:**
  - Event details summary
  - Featured event badge (if applicable)
  - Description
  - Review checklist
  - Next steps

**Example PR Body:**
```markdown
## New Event Submission

**Event:** Live Jazz at Blue Note Chicago
**Date:** Sunday, September 14, 2025
**Time:** 7:00 PM - 10:00 PM
**Venue:** Blue Note Chicago
**Location:** Chicago, IL

⭐ **FEATURED EVENT**

### Description

The Jack Macklin Trio brings sophisticated jazz to one of Chicago's
premier venues. An evening of classic standards and original compositions.

---

🤖 Auto-generated from event creation form at /create-event

**Preview Deploy:** Cloudflare Pages will create a preview deploy automatically.

### Review Checklist
- [ ] Event details are accurate
- [ ] Date and time are correct
- [ ] Venue and location are properly formatted
- [ ] Description is appropriate
- [ ] Ticket URL works correctly
- [ ] Featured event status is warranted

### Next Steps
1. Review the changes in the Files Changed tab
2. Check the preview deploy (link will appear in comments)
3. Merge when ready to publish
```

## Testing Locally

1. Start the worker in dev mode:
   ```bash
   npm run dev
   ```

2. Worker runs at `http://localhost:8787`

3. Test with curl:
   ```bash
   curl -X POST http://localhost:8787/create-event \
     -F "title=Test Event" \
     -F "date=2025-09-14T19:00:00Z" \
     -F "venue=Test Venue" \
     -F "location=Chicago, IL" \
     -F "description=Test description"
   ```

4. Or update the form action temporarily:
   ```html
   <form action="http://localhost:8787/create-event">
   ```

## Troubleshooting

### "Missing required fields" Error
- Check that all required fields are being sent
- Verify form field names match worker expectations
- Check browser Network tab for POST payload

### "GitHub API Error"
- Verify GITHUB_TOKEN is set correctly
- Ensure token has `repo` scope
- Check token hasn't expired
- Verify repository name and owner are correct

### "Branch already exists" Warning
- This is usually harmless - worker updates existing branch
- Multiple submissions for same date/venue reuse branch
- To force new branch, change date or venue slightly

### Worker Not Receiving Requests
- Check worker route configuration in `wrangler.toml`
- Verify DNS settings point to Cloudflare
- Check Cloudflare dashboard for worker logs
- Ensure CORS headers are correct for cross-origin requests

### Preview Deploy Not Working
- Cloudflare Pages creates preview deploys automatically for PRs
- Check Pages settings → Builds & deployments → Preview deployments
- Ensure "Enable preview deployments" is turned on
- Preview URL appears as comment on PR within 2-3 minutes

## Security Considerations

1. **GitHub Token:**
   - Store in Worker secrets, never in code
   - Use minimal scopes (only `repo`)
   - Rotate periodically (every 6-12 months)
   - Monitor usage in GitHub settings

2. **CORS:**
   - Currently allows all origins (`*`)
   - In production, restrict to `jack.unjoe.me` only
   - Update CORS headers in worker code

3. **Form Password:**
   - Password protection on form prevents unauthorized submissions
   - Consider additional validation in worker
   - Check `EVENT_FORM_PASSWORD` secret if needed

4. **Rate Limiting:**
   - Consider adding rate limiting to prevent abuse
   - Cloudflare Workers KV can track submission counts
   - Implement daily/hourly limits per IP or user

## Cost

**Cloudflare Workers:**
- Free tier: 100,000 requests/day
- Typical usage: <100 requests/month
- **Cost:** $0/month

**GitHub API:**
- Free for authenticated requests
- 5,000 requests/hour rate limit
- Typical usage: <50 requests/month
- **Cost:** $0/month

**Total:** $0/month

## Future Enhancements

- [ ] Image upload support (custom event images)
- [ ] Email notifications when PR is merged
- [ ] Draft vs. immediate publish option
- [ ] Event update/edit functionality
- [ ] Bulk event import from CSV
- [ ] Integration with Google Calendar API
- [ ] Automatic event reminders via email
- [ ] Social media post generation (Phase 2)

## Related Documentation

- [Main README](../README.md)
- [Environment Setup](../ENV_SETUP.md)
- [Phase 1 Issue Template](../.github/ISSUE_TEMPLATE/phase1-event-form.md)
- [Epic #735](https://github.com/jrc1883/elshaddai/issues/735)
