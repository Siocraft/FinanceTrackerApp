# Code Quality Workflow

This document outlines the comprehensive code quality workflow implemented for the Finance Tracker mobile app.

## 🎯 Overview

The quality workflow ensures that all code pushed to main meets high standards through automated checks, pre-commit hooks, and CI/CD pipelines.

## 🔧 Quality Checks

### 1. TypeScript Type Checking
- **Command**: `npm run type-check`
- **What it does**: Validates TypeScript types without emitting files
- **Runs on**: Pre-commit, CI/CD
- **Failure condition**: Type errors found

### 2. ESLint Code Linting
- **Command**: `npm run lint`
- **What it does**: Checks code style, finds potential errors, enforces best practices
- **Runs on**: Pre-commit, CI/CD
- **Failure condition**: Linting errors or warnings above threshold

### 3. Prettier Code Formatting
- **Command**: `npm run format:check`
- **What it does**: Ensures consistent code formatting
- **Runs on**: Pre-commit, CI/CD
- **Failure condition**: Inconsistent formatting found

### 4. Unit Testing
- **Command**: `npm run test:coverage`
- **What it does**: Runs all unit tests with coverage reporting
- **Runs on**: Pre-commit, CI/CD
- **Coverage threshold**: 70% minimum

### 5. Security Checks
- **Command**: `npm audit`
- **What it does**: Checks for known vulnerabilities in dependencies
- **Runs on**: CI/CD only
- **Failure condition**: Moderate or higher severity vulnerabilities

### 6. Build Verification
- **Command**: `npx expo export --platform web --clear --no-minify`
- **What it does**: Ensures the app can be built successfully
- **Runs on**: CI/CD only
- **Failure condition**: Build errors

## 🚀 GitHub Actions Workflow

### Triggers
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

### Jobs
1. **Quality Check**: TypeScript, ESLint, Prettier, unused dependencies
2. **Security Check**: npm audit, secrets scanning
3. **Test**: Unit tests with coverage reporting
4. **Build Check**: App build verification
5. **API Check**: API types and service validation

### Workflow Features
- **Parallel execution**: Jobs run in parallel for faster feedback
- **Caching**: npm dependencies are cached for faster builds
- **Matrix builds**: Support for multiple Node.js versions
- **Status checks**: Required for merging to main

## 🪝 Pre-commit Hooks

### Setup
```bash
npm install
npm run prepare  # Installs husky hooks
```

### What runs on commit
1. TypeScript type checking
2. ESLint with zero warnings
3. Prettier formatting check
4. Unit tests with coverage

### Bypassing hooks (emergency only)
```bash
git commit --no-verify -m "emergency fix"
```

## 📝 Commit Message Standards

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Revert previous commit

### Scopes
- `app`: Application level changes
- `api`: API related changes
- `ui`: UI/UX changes
- `auth`: Authentication related
- `db`: Database related
- `test`: Testing related
- `deps`: Dependencies
- `config`: Configuration files

### Examples
```
feat(api): add user authentication endpoint
fix(ui): resolve navigation header alignment issue
docs(readme): update installation instructions
refactor(components): extract reusable button component
test(hooks): add unit tests for useTransactions hook
chore(deps): update React Native to latest version
```

## 🛠️ Development Workflow

### Before Starting Work
1. Ensure you're on the latest main branch
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Install dependencies: `npm install`

### During Development
1. Write code following the established patterns
2. Run quality checks locally: `npm run quality-check`
3. Write tests for new functionality
4. Ensure all tests pass: `npm run test`

### Before Committing
1. Stage your changes: `git add .`
2. Run quality checks: `npm run quality-check`
3. Commit with proper message: `git commit -m "type(scope): description"`

### Before Pushing
1. Ensure all quality checks pass
2. Push to your feature branch: `git push origin feature/your-feature`
3. Create a pull request to main

## 🔍 Local Development Commands

### Quality Checks
```bash
# Run all quality checks
npm run quality-check

# Individual checks
npm run type-check    # TypeScript checking
npm run lint          # ESLint
npm run lint:fix      # ESLint with auto-fix
npm run format:check  # Prettier check
npm run format        # Prettier auto-format
```

### Testing
```bash
# Run tests
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Development
```bash
# Start development server
npm start             # Expo development server
npm run android       # Android development
npm run ios          # iOS development
npm run web          # Web development
```

## 📊 Quality Metrics

### Coverage Targets
- **Lines**: 70% minimum
- **Functions**: 70% minimum
- **Branches**: 70% minimum
- **Statements**: 70% minimum

### Performance Targets
- **Bundle size**: < 2MB for initial load
- **Build time**: < 5 minutes
- **Test execution**: < 30 seconds

### Code Quality Targets
- **TypeScript errors**: 0
- **ESLint warnings**: 0
- **Prettier violations**: 0
- **Security vulnerabilities**: 0

## 🚨 Troubleshooting

### Common Issues

#### TypeScript Errors
```bash
# Check for type errors
npm run type-check

# Fix common issues
npm run lint:fix
```

#### ESLint Errors
```bash
# Check for linting issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

#### Prettier Issues
```bash
# Check formatting
npm run format:check

# Auto-format
npm run format
```

#### Test Failures
```bash
# Run tests with verbose output
npm run test -- --verbose

# Run specific test file
npm run test -- --testPathPattern=ComponentName
```

### Getting Help
1. Check the error messages carefully
2. Review the relevant configuration files
3. Consult the documentation
4. Ask for help in the team chat

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [React Native Testing](https://reactnative.dev/docs/testing)
- [Git Commit Guidelines](https://www.conventionalcommits.org/)
