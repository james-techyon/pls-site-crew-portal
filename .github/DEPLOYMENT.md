# Deployment Configuration Guide

This document outlines the automated deployment pipeline setup for the Prestige Labor Solutions Contractor Form.

## Overview

The CI/CD pipeline uses GitHub Actions to automatically build, test, and deploy the application to multiple platforms:

- **Vercel** - Primary production deployment
- **Netlify** - Backup/staging deployment  
- **GitHub Pages** - Static hosting option

## Required Secrets

Configure these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

### Vercel Deployment
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id  
VERCEL_PROJECT_ID=your_vercel_project_id
```

### Netlify Deployment
```
NETLIFY_AUTH_TOKEN=your_netlify_auth_token
NETLIFY_SITE_ID=your_netlify_site_id
```

## Workflows

### 1. Main Deployment (`deploy.yml`)
- **Triggers**: Push to `main` branch, manual dispatch
- **Actions**: Build, test, deploy to all platforms
- **Environments**: Production

### 2. Pull Request Checks (`pr-check.yml`)
- **Triggers**: Pull requests to `main`/`develop`
- **Actions**: Lint, type-check, build, security audit, preview deploy
- **Purpose**: Quality assurance before merging

### 3. Release Deployment (`release.yml`)
- **Triggers**: Release published, manual dispatch
- **Actions**: Version management, comprehensive testing, multi-platform deployment
- **Features**: Build reports, deployment summaries

### 4. Maintenance (`maintenance.yml`)
- **Triggers**: Weekly schedule (Mondays 9 AM UTC), manual dispatch
- **Actions**: Dependency audit, security scanning, performance analysis
- **Output**: Automated maintenance reports and GitHub issues

## Setup Instructions

### 1. Vercel Setup
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link`
4. Get project info: `vercel project ls`
5. Get org ID from Vercel dashboard settings
6. Generate deployment token in Vercel account settings

### 2. Netlify Setup
1. Create new site in Netlify dashboard
2. Note the Site ID from site settings
3. Generate Personal Access Token in User Settings → Applications
4. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `dist`

### 3. GitHub Pages Setup
1. Go to repository Settings → Pages
2. Set source to "GitHub Actions"
3. The workflow will handle deployment automatically

## Environment Variables

Set these in your deployment platform's environment settings:

```bash
NODE_ENV=production
BASE_URL=/  # or /pls-site-crew-portal/ for GitHub Pages
```

## Manual Deployment

You can trigger manual deployments using GitHub Actions:

1. Go to Actions tab in your repository
2. Select the appropriate workflow
3. Click "Run workflow"
4. Choose your options and run

## Monitoring and Alerts

The pipeline includes:

- Build status notifications
- Deployment success/failure reporting
- Security vulnerability alerts
- Performance monitoring
- Automated maintenance issue creation

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors: `bun run type-check`
   - Check linting errors: `bun run lint`
   - Verify dependencies: `bun install`

2. **Deployment Failures**
   - Verify secrets are set correctly
   - Check platform-specific logs
   - Ensure build artifacts are generated

3. **Permission Errors**
   - Verify GitHub Actions permissions
   - Check deployment platform access tokens
   - Ensure repository has proper permissions

### Debug Commands

```bash
# Local development
bun run dev

# Build locally
bun run build

# Preview build
bun run preview

# Check for issues
bun run check

# Clean and rebuild
bun run clean && bun run build
```

## Security Considerations

- All sensitive tokens are stored as GitHub Secrets
- Dependency scanning runs weekly
- Security alerts are automatically created
- Pull requests require passing security checks

## Performance Optimization

- Bundle analysis runs on each build
- Performance reports generated weekly
- Asset optimization recommendations
- Build size monitoring

## Support

For issues with the deployment pipeline:

1. Check the Actions tab for detailed logs
2. Review this documentation
3. Check platform-specific status pages
4. Contact the development team

## Version Management

Releases are automatically versioned and tagged:
- Manual releases via GitHub Releases
- Automated version bumping
- Deployment tracking and rollback capabilities