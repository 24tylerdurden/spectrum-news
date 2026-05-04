# Database Migrations

This project uses [golang-migrate](https://github.com/golang-migrate/migrate) for database migration management.

## Installation

### Install golang-migrate CLI

#### macOS
```bash
brew install golang-migrate
```

#### Linux
```bash
curl -L https://github.com/golang-migrate/migrate/releases/download/v4.16.2/migrate.linux-amd64.tar.gz | tar xvz
sudo mv migrate /usr/local/bin/migrate
```

#### Windows
Download from [GitHub Releases](https://github.com/golang-migrate/migrate/releases)

## Migration Files

Migration files are stored in the `backend/migrations/` directory with the naming convention:
- `{version}_{name}.up.sql` - Applied when migrating up
- `{version}_{name}.down.sql` - Applied when migrating down

Example: `000001_init_schema.up.sql` and `000001_init_schema.down.sql`

## Creating a New Migration

### Using Make (Recommended)
```bash
cd backend
make migrate-create NAME=add_new_table
```

### Using CLI directly
```bash
migrate create -ext sql -dir ./migrations -seq add_new_table
```

This will create two files:
- `000002_add_new_table.up.sql`
- `000002_add_new_table.down.sql`

## Running Migrations

### Automatic Migration on Startup

The application automatically runs migrations on startup when the database connection is established. This is handled in `database/db.go`.

### Manual Migration

#### Using Make
```bash
cd backend

# Run all pending migrations
make migrate-up

# Rollback the last migration
make migrate-down

# Rollback all migrations
make migrate-down-all

# Show current migration version
make migrate-version

# Force set migration version (use with caution)
make migrate-force VERSION=1
```

#### Using CLI directly
```bash
cd backend

# Run all pending migrations
migrate -path ./migrations -database "postgres://indian_biased:indian_biased_password@localhost:5432/indian_biased?sslmode=disable" up

# Rollback the last migration
migrate -path ./migrations -database "postgres://indian_biased:indian_biased_password@localhost:5432/indian_biased?sslmode=disable" down 1

# Show current version
migrate -path ./migrations -database "postgres://indian_biased:indian_biased_password@localhost:5432/indian_biased?sslmode=disable" version
```

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `MIGRATIONS_PATH` - Path to migration files (default: `./migrations`)

## Docker Compose

When using Docker Compose, migrations are automatically run on backend startup. The `MIGRATIONS_PATH` environment variable is set in `docker-compose.yml`.

## Best Practices

1. **Always create both up and down migrations** - Ensure you can rollback changes
2. **Use transactions** - Each migration should be atomic
3. **Test migrations** - Always test both up and down migrations
4. **Don't modify existing migrations** - Create a new migration instead
5. **Use descriptive names** - Make migration names clear and specific
6. **Review before committing** - Ensure migration files are reviewed before merging

## Migration Version Control

- Migration files are tracked in Git
- Never commit the `schema.sql` file (it's replaced by migrations)
- Each migration should be a single, logical change

## Troubleshooting

### Migration already applied
If you get an error that a migration is already applied, you can force the version:
```bash
make migrate-force VERSION=1
```

### Database connection issues
Ensure your `DATABASE_URL` is correct and the database is running.

### Migration failed
If a migration fails, check the error message and fix the issue. You may need to manually rollback or force the version.

## Example Migration

### Up Migration (`000002_add_user_preferences.up.sql`)
```sql
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(20) DEFAULT 'light',
    notifications_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
```

### Down Migration (`000002_add_user_preferences.down.sql`)
```sql
DROP INDEX IF EXISTS idx_user_preferences_user_id;
DROP TABLE IF EXISTS user_preferences;
```
