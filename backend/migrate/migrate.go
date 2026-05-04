package migrate

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

// RunMigrations runs database migrations
func RunMigrations(dbURL string, migrationsPath string) error {
	m, err := migrate.New(
		fmt.Sprintf("file://%s", migrationsPath),
		dbURL,
	)
	if err != nil {
		return fmt.Errorf("failed to create migrate instance: %w", err)
	}
	defer m.Close()

	if err := m.Up(); err != nil {
		if err == migrate.ErrNoChange {
			log.Println("Database is already up to date")
			return nil
		}
		return fmt.Errorf("failed to run migrations: %w", err)
	}

	log.Println("Migrations completed successfully")
	return nil
}

// RunMigrationsFromDB runs migrations using an existing DB connection
func RunMigrationsFromDB(db *sql.DB, migrationsPath string) error {
	m, err := migrate.New(
		fmt.Sprintf("file://%s", migrationsPath),
		os.Getenv("DATABASE_URL"),
	)
	if err != nil {
		return fmt.Errorf("failed to create migrate instance: %w", err)
	}
	defer m.Close()

	if err := m.Up(); err != nil {
		if err == migrate.ErrNoChange {
			log.Println("Database is already up to date")
			return nil
		}
		return fmt.Errorf("failed to run migrations: %w", err)
	}

	log.Println("Migrations completed successfully")
	return nil
}

// getDSNFromDB constructs DSN from DB connection (helper)
func getDSNFromDB(db *sql.DB) string {
	// This is a simplified version - in production you'd want to extract
	// the actual connection parameters from the DB connection
	// For now, we'll use environment variable approach
	return ""
}
