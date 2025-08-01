#!/usr/bin/env node

/**
 * Deployment Setup Helper Script
 * 
 * This script helps configure deployment settings for the PLS Contractor Form.
 * Run with: node scripts/setup-deployment.js
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors for console output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(`${colors.blue}${prompt}${colors.reset}`, resolve);
  });
}

async function main() {
  log('\n🚀 PLS Contractor Form Deployment Setup', colors.bold + colors.green);
  log('='.repeat(50), colors.green);
  
  try {
    // Check if we're in a git repository
    const repoUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const repoName = repoUrl.split('/').pop().replace('.git', '');
    
    log(`\n📁 Repository: ${repoName}`, colors.blue);
    log(`🔗 URL: ${repoUrl}`, colors.blue);
    
  } catch (error) {
    log('\n❌ Error: Not in a git repository or no remote origin set', colors.red);
    process.exit(1);
  }

  const setupChoice = await question('\nWhat would you like to set up?\n1. Vercel\n2. Netlify\n3. GitHub Pages\n4. All platforms\n5. Just generate environment template\n\nChoice (1-5): ');

  switch (setupChoice) {
    case '1':
      await setupVercel();
      break;
    case '2':
      await setupNetlify();
      break;
    case '3':
      await setupGitHubPages();
      break;
    case '4':
      await setupAll();
      break;
    case '5':
      await generateEnvTemplate();
      break;
    default:
      log('Invalid choice. Exiting.', colors.red);
      process.exit(1);
  }

  log('\n✅ Setup complete!', colors.green);
  log('\nNext steps:', colors.bold);
  log('1. Add the generated secrets to your GitHub repository settings');
  log('2. Go to Settings → Secrets and variables → Actions');
  log('3. Add each secret with the values from the output above');
  log('4. Commit and push your changes to trigger the first deployment');
  
  rl.close();
}

async function setupVercel() {
  log('\n🟢 Setting up Vercel deployment...', colors.green);
  
  const hasVercelCli = await checkCommand('vercel --version');
  if (!hasVercelCli) {
    log('❌ Vercel CLI not found. Install with: npm i -g vercel', colors.red);
    return;
  }

  log('\n📋 To get your Vercel configuration:', colors.yellow);
  log('1. Run: vercel login');
  log('2. Run: vercel link');
  log('3. Run: vercel project ls');
  log('4. Get your org ID from Vercel dashboard settings');
  log('5. Generate a token at: https://vercel.com/account/tokens');

  const token = await question('\nEnter your Vercel token: ');
  const orgId = await question('Enter your Vercel org ID: ');
  const projectId = await question('Enter your Vercel project ID: ');

  log('\n📝 Add these secrets to GitHub:', colors.bold);
  log(`VERCEL_TOKEN=${token}`);
  log(`VERCEL_ORG_ID=${orgId}`);
  log(`VERCEL_PROJECT_ID=${projectId}`);
}

async function setupNetlify() {
  log('\n🟠 Setting up Netlify deployment...', colors.green);
  
  log('\n📋 To get your Netlify configuration:', colors.yellow);
  log('1. Create a new site in Netlify dashboard');
  log('2. Note the Site ID from site settings');
  log('3. Generate a Personal Access Token in User Settings → Applications');
  log('4. Set build command to: bun run build');
  log('5. Set publish directory to: dist');

  const authToken = await question('\nEnter your Netlify auth token: ');
  const siteId = await question('Enter your Netlify site ID: ');

  log('\n📝 Add these secrets to GitHub:', colors.bold);
  log(`NETLIFY_AUTH_TOKEN=${authToken}`);
  log(`NETLIFY_SITE_ID=${siteId}`);
}

async function setupGitHubPages() {
  log('\n⚫ Setting up GitHub Pages deployment...', colors.green);
  
  log('\n📋 GitHub Pages setup:', colors.yellow);
  log('1. Go to your repository Settings → Pages');
  log('2. Set source to "GitHub Actions"');
  log('3. The workflow will handle deployment automatically');
  log('\n✅ No additional secrets required for GitHub Pages!');
}

async function setupAll() {
  await setupVercel();
  await setupNetlify();
  await setupGitHubPages();
}

async function generateEnvTemplate() {
  const template = `# GitHub Secrets Configuration Template
# Add these to your GitHub repository: Settings → Secrets and variables → Actions

# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here

# Netlify Configuration
NETLIFY_AUTH_TOKEN=your_netlify_auth_token_here
NETLIFY_SITE_ID=your_netlify_site_id_here

# Note: GitHub Pages requires no additional secrets
# Just enable it in repository Settings → Pages → Source: GitHub Actions

# Optional: Environment Variables for Build
NODE_ENV=production
BASE_URL=/

# For GitHub Pages deployment, use:
# BASE_URL=/repository-name/
`;

  writeFileSync('.env.deployment.template', template);
  log('\n📝 Generated .env.deployment.template file', colors.green);
  log('Review and customize this file with your actual values.', colors.yellow);
}

async function checkCommand(command) {
  try {
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Error handling
process.on('SIGINT', () => {
  log('\n\n👋 Setup cancelled', colors.yellow);
  rl.close();
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  log(`\n❌ Unexpected error: ${error.message}`, colors.red);
  rl.close();
  process.exit(1);
});

// Run the setup
main().catch((error) => {
  log(`\n❌ Setup failed: ${error.message}`, colors.red);
  rl.close();
  process.exit(1);
});