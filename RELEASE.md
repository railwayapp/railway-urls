# Release Process

Releases are automated via GitHub Actions when a version tag is pushed.

## Steps

1. Update version in `package.json`:
   ```bash
   # Example: 0.1.0 -> 0.1.1
   npm version patch
   # or: npm version minor
   # or: npm version major
   ```

_You do not need to manually update the version in `package.json`._

2. Push the tag:

   ```bash
   git push --follow-tags
   ```

3. GitHub Actions will automatically:
   - Run tests and type checking
   - Build the package
   - Publish to npm with provenance
   - Create a GitHub release
