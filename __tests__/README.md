# CI Pipeline Test Suite

This repository contains a suite of tests designed to validate your CI pipeline configuration. These tests ensure that your build process, Docker configuration, code quality checks, and environment setup all meet best practices.

## Test Cases

The test suite includes 5 different categories of tests:

1. **Build Process Tests** (`build.test.js`)

   - Validates that the build script is properly configured
   - Checks for the existence of Next.js configuration
   - Ensures the build command runs without errors

2. **Docker Tests** (`docker.test.js`)

   - Verifies that a Dockerfile exists
   - Checks that the Dockerfile uses the correct base image
   - Tests that a Docker image can be built successfully

3. **Code Quality Tests** (`code-quality.test.js`)

   - Verifies TypeScript compilation
   - Checks ESLint configuration
   - Ensures all necessary CI scripts are defined in package.json

4. **Environment Configuration Tests** (`environment.test.js`)

   - Validates Next.js configuration
   - Checks for proper environment variable setup
   - Verifies Docker Compose configuration

5. **CI Pipeline Tests** (`ci-pipeline.test.js`)
   - Confirms existence of CI configuration files
   - Checks that CI includes all essential steps
   - Verifies Docker build step in CI workflow

## Running the Tests

To run all tests:

```bash
npm test
```

To run a specific test category:

```bash
npx jest __tests__/build.test.js
```

## Understanding Test Results

- ✅ **Passing Tests**: Everything is configured correctly
- ⚠️ **Warnings**: Suggestions for improvement but not failures
- ❌ **Failing Tests**: Critical issues that need to be fixed

## CI Pipeline Integration

These tests are automatically run as part of the GitHub Actions workflow defined in `.github/workflows/ci.yml`. The workflow will:

1. Check out the code
2. Set up Node.js
3. Install dependencies
4. Run linting
5. Perform TypeScript checking
6. Build the application
7. Run these tests
8. Build a Docker image

## Troubleshooting

If you encounter test failures:

1. Read the error message carefully to understand what's failing
2. Check the corresponding configuration file mentioned in the error
3. Make the necessary changes and run the tests again

## Note for Local Testing

Some tests (like Docker builds) may be skipped in local environments if the required tools are not available. These tests will always run in the CI environment.
