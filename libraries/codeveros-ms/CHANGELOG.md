# Changelog
All notable changes to this project will be documented in this file.

## [0.3.0-dev] - 2020-02-11
### Added
- Route to retrieve API Docs (GET /api/docs). Returns the OpenAPI specification or a 500 error if not retrieved.
- createService options parameter to specify OpenAPI spec file location
  (**options.specPath**). Defaults to `swagger.yaml` and `swagger.json` in the project root directory.

## [0.2.0-dev] - 2020-01-14
### Changed
- **BREAKING**: Made database connection optional. If configuration not set via environment variables or passed in directly
  to createService, the database connection will be skipped. If relying on default values for database connection, it will
  no longer connect. Set `DB_DATABASE=myapp` and `DB_HOST=localhost` in .env file to restore existing default functionality.

### Removed
- Default database configuration for database name and host. Previously defaulted to **myapp** and **localhost**

## [0.1.0-dev]
Initial Functionality
