# Deployment Lessons Learned - December 30, 2025

## Issue: Blog Post Not Deploying to Production

### Context
Created blog post "When Compassion Becomes a Weapon" and attempted to deploy to unjoe.me via Cloudflare Pages. Despite multiple commits and pushes, the post was not appearing on the live site.

### Root Causes Identified

#### 1. Cloudflare Pages Watching Wrong Branch
**Problem**: Cloudflare Pages production branch was set to `master`, but we were pushing to `main`
**Solution**: Changed production branch in Cloudflare dashboard from `master` to `main`
**Location**: Cloudflare Dashboard → Workers & Pages → unjoe-me → Settings → Build configuration → Branch control

#### 2. Workspace Dependencies in Production Build
**Problem**: `package.json` contained `"@elshaddai/portfolio-ui": "workspace:*"` which npm doesn't understand in production
**Error**: `npm error Unsupported URL Type "workspace:": workspace:*`
**Solution**: Removed workspace dependency from package.json and removed Vite alias from astro.config.mjs
**Files Changed**:
- `package.json` - removed `@elshaddai/portfolio-ui` dependency
- `astro.config.mjs` - removed Vite resolve alias

#### 3. Workspace Import Paths in Source Code
**Problem**: Source files still importing from workspace package path even after dependency removed
**Error**: `Could not resolve "../../../packages/portfolio-ui/src/components/utils/BaseHead.astro"`
**Solution**: Updated all imports to use local component paths
**Files Changed**:
- `src/layouts/BlogPost.astro`
- `src/pages/about.astro`
- `src/pages/blog/index.astro`
- `src/pages/projects/index.astro`
- `src/pages/index.astro`

**Pattern**: Changed from `'../../../packages/portfolio-ui/src/components/utils/BaseHead.astro'` to `'../components/BaseHead.astro'`

#### 4. Date Format Inconsistency (Minor)
**Problem**: New blog post used ISO date format `2025-12-30` while existing posts used string format `'Dec 30 2025'`
**Solution**: Changed to match existing format for consistency
**Note**: This may not have been critical as Astro schema uses `z.coerce.date()`, but consistency is better

### Dual-Repo Workflow

**Setup**: Portfolio develops in ElShaddai monorepo (gitignored) but publishes to public github.com/jrc1883/unjoe-me
**Similar to**: PopKit's plugin-public remote pattern
**Reason**: Portfolio was gitignored in monorepo (line 91 of .gitignore)

**Git Configuration**:
```bash
# In apps/unjoe-portfolio/
git init
git remote add origin https://github.com/jrc1883/unjoe-me.git
git pull origin main --allow-unrelated-histories
git push origin master:main
```

### Commands Used

```bash
# Remove workspace dependency
npm uninstall @elshaddai/portfolio-ui

# Fix import paths (manual editing)
# ... 5 files updated

# Commit and deploy
git add .
git commit -m "fix: replace all workspace package imports with local component paths"
git push origin master:main

# Trigger deployment
git commit --allow-empty -m "chore: trigger Cloudflare Pages deployment"
git push origin master:main
```

### Prevention Strategies

1. **Branch Protection**: Add branch protection rules to unjoe-me repo (similar to ElShaddai monorepo)
2. **Pre-deployment Testing**: Run `npm run build` locally before pushing to catch build errors
3. **Cloudflare Webhooks**: Verify GitHub webhook is properly configured in Cloudflare Pages
4. **Documentation**: Document dual-repo workflow in README.md
5. **Workspace Dependencies**: Avoid workspace dependencies in projects that need standalone deployment

### Timeline
- **Issue Detected**: ~2:30 AM - Blog post not appearing on unjoe.me despite commits
- **Root Cause 1**: ~2:45 AM - Cloudflare watching wrong branch
- **Root Cause 2**: ~3:00 AM - Workspace dependency causing build failure
- **Root Cause 3**: ~3:15 AM - Import paths still referencing workspace
- **Resolution**: ~3:25 AM - All fixes applied, deployment successful
- **Total Time**: ~55 minutes from detection to resolution

### Success Metrics
- ✅ Blog post live at https://unjoe.me/blog/when-compassion-becomes-a-weapon/
- ✅ All import errors resolved
- ✅ Cloudflare Pages now auto-deploying on push to main
- ✅ Build time: ~2-3 minutes (normal)

### Future Improvements
1. Add branch protection rules to prevent accidental direct pushes
2. Consider GitHub Actions for pre-deployment testing
3. Add social sharing buttons to blog posts
4. Explore automated cross-posting to social media (Facebook, X/Twitter)
5. Document content creation workflow in CLAUDE.md

### Related Files
- `.gitignore` (monorepo) - Line 91 excludes apps/unjoe-portfolio/
- `wrangler.jsonc` - Cloudflare Workers configuration
- `astro.config.mjs` - Astro + Cloudflare adapter configuration
- `CLAUDE.md` - Content workflows documented
- `README.md` - Project documentation
