# Prestige Labor Solutions - Contractor Portal

![Deploy Status](https://github.com/james-techyon/pls-site-crew-portal/actions/workflows/deploy.yml/badge.svg)
![PR Checks](https://github.com/james-techyon/pls-site-crew-portal/actions/workflows/pr-check.yml/badge.svg)
![Maintenance](https://github.com/james-techyon/pls-site-crew-portal/actions/workflows/maintenance.yml/badge.svg)

A modern, professional contractor intake form built with React, TypeScript, and TailwindCSS, featuring automated CI/CD deployment pipeline and comprehensive form validation.

## 🚀 Features

- **4-Step Process**: Personal Info → Eligible Positions → Additional Info → Review & Submit
- **Professional PLS Branding**: Official logo, colors (#ffb700), and animations
- **Enhanced UX**: Glassmorphism effects, smooth animations, responsive design
- **Form Validation**: Real-time validation with clear error states
- **Accessibility**: Screen reader support and keyboard navigation
- **Modern Tech Stack**: React 19, TypeScript, TailwindCSS V4, ShadCN UI
- **Automated Deployment**: GitHub Actions CI/CD pipeline with multi-platform deployment

## 🏗️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: TailwindCSS V4, ShadCN UI Components
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Deployment**: GitHub Actions, Vercel, Netlify, GitHub Pages
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/james-techyon/pls-site-crew-portal.git
cd pls-site-crew-portal
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
# Development
bun dev                 # Start development server
bun build              # Build for production
bun preview            # Preview production build
bun serve              # Serve production build

# Code Quality
bun lint               # Run ESLint
bun lint:fix           # Fix ESLint issues
bun type-check         # Run TypeScript type checking
bun check              # Run both type-check and lint

# Utilities
bun clean              # Clean dist directory
```

## 🚀 Deployment

This project features a comprehensive CI/CD pipeline with automated deployment to multiple platforms.

### Automated Deployment Pipeline

- **Main Branch**: Automatically deploys to production on push to `main`
- **Pull Requests**: Runs tests, linting, and creates preview deployments
- **Releases**: Handles versioning and multi-platform deployment
- **Maintenance**: Weekly security scans and dependency audits

### Deployment Platforms

1. **Vercel** (Primary) - Fast, global CDN deployment
2. **Netlify** (Backup) - Alternative hosting with form handling
3. **GitHub Pages** (Static) - Free static hosting option

### Quick Setup

1. **Automated Setup**:
```bash
node scripts/setup-deployment.js
```

2. **Manual Setup**: 
   - Follow the [Deployment Guide](.github/DEPLOYMENT.md)
   - Add required secrets to GitHub repository settings

### Required GitHub Secrets

```bash
# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id

# Netlify
NETLIFY_AUTH_TOKEN=your_netlify_auth_token
NETLIFY_SITE_ID=your_netlify_site_id
```

## 📝 Form Structure

### Step 1: Personal Information
- Basic contact details
- Emergency contact information
- Employment preferences

### Step 2: Eligible Positions
Expandable sections for specialization areas:
- **Audio**: Sound engineering, mixing, equipment operation
- **Video**: Camera operation, editing, live streaming
- **Lighting**: Design, programming, equipment setup
- **Management**: Project coordination, team leadership
- **Assist**: General support, equipment handling

### Step 3: Additional Information
- Portfolio and work samples
- Transportation and equipment
- Availability and scheduling
- Special skills and certifications

### Step 4: Review & Submit
- Form validation summary
- Data review and confirmation
- Submission handling

## 🎨 Design System

### Colors (PLS Branding)
- **Primary**: `#ffb700` (Prestige Gold)
- **Background**: `#0a0a0a` (Deep Black)
- **Text**: `#ffffff` (White)
- **Accent**: Various opacity levels of primary color

### Typography
- **Headings**: Inter (sans-serif)
- **Body**: Inter (sans-serif)
- **Monospace**: JetBrains Mono

### Animations
- Glassmorphism effects with backdrop blur
- Smooth transitions and micro-interactions
- Animated background grid
- Logo glow effects
- Form element focus animations

## 🔧 Configuration

### Environment Variables

```bash
NODE_ENV=production
BASE_URL=/                 # or /repo-name/ for GitHub Pages
```

### Tailwind Configuration

The project uses TailwindCSS V4 with custom theme configuration in `src/index.css`:

```css
@theme inline {
  --color-primary: oklch(0.78 0.18 58); /* #ffb700 */
  --color-background: oklch(0.04 0 0);  /* #0a0a0a */
  /* ... more theme variables */
}
```

### ShadCN UI Components

All ShadCN UI components are pre-installed and customized for the PLS brand:
- Form components with enhanced styling
- Accessible form controls
- Custom animations and transitions
- Brand-consistent color scheme

## 📱 Responsive Design

The form is fully responsive and optimized for:
- **Desktop**: Full-featured experience with animations
- **Tablet**: Touch-friendly interface with optimized layouts
- **Mobile**: Streamlined forms with simplified navigation

## 🛡️ Security & Quality

### Automated Checks
- **Security Scanning**: Weekly Trivy vulnerability scans
- **Dependency Auditing**: Automated npm/bun audit checks
- **Code Quality**: ESLint and TypeScript strict mode
- **Performance**: Bundle size analysis and optimization

### Accessibility
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- Focus management
- Color contrast compliance

## 📊 Performance

### Optimization Features
- Code splitting and lazy loading
- Image optimization
- Bundle size monitoring
- Performance budgets
- CDN deployment

### Metrics Monitoring
- Bundle analysis on every build
- Performance reports in CI/CD
- Automated optimization recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use conventional commit messages
- Ensure all tests pass
- Maintain 100% TypeScript coverage
- Follow accessibility best practices

## 📄 License

This project is proprietary to Prestige Labor Solutions.

## 🔗 Links

- **Production**: [Deployed App URL]
- **Staging**: [Staging URL]
- **Documentation**: [Deployment Guide](.github/DEPLOYMENT.md)
- **Issues**: [GitHub Issues](https://github.com/james-techyon/pls-site-crew-portal/issues)

## 📞 Support

For technical support or questions:
- Create an issue on GitHub
- Contact the development team
- Check the deployment documentation

---

**Built with ❤️ by the PLS Development Team**