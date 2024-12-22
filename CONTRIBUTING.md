# Contributing to SoDAS

Thank you for your interest in contributing to SoDAS! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/your-org/sodas/issues)
2. If not, create a new issue using the bug report template
3. Include:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, browser, versions)
   - Screenshots if applicable

### Suggesting Enhancements

1. Check existing [Issues](https://github.com/your-org/sodas/issues) for similar suggestions
2. Create a new issue using the feature request template
3. Provide:
   - Clear use case
   - Expected behavior
   - Potential implementation approach

### Pull Requests

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following our coding standards
4. Commit your changes:
   ```bash
   git commit -m "feat: add new feature"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/) specification
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a Pull Request

## Development Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Run tests:
   ```bash
   pnpm test
   ```

## Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Use meaningful commit messages

## Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Update API documentation if applicable

## Questions?

Join our [Discord](https://discord.gg/EFYm7WXr) for quick help.

Thank you for contributing to SoDAS! 🚀 