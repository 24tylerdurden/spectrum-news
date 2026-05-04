package database

import (
	"fmt"
	"log"
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/joho/godotenv"
	"github.com/24tylerdurden/indian-biased/migrate"
)

var DB *sqlx.DB

func Init() error {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		return fmt.Errorf("DATABASE_URL environment variable is not set")
	}

	var err error
	DB, err = sqlx.Connect("postgres", dbURL)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	if err := DB.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	// Run migrations
	migrationsPath := os.Getenv("MIGRATIONS_PATH")
	if migrationsPath == "" {
		migrationsPath = "./migrations"
	}

	if err := migrate.RunMigrations(dbURL, migrationsPath); err != nil {
		log.Printf("Warning: failed to run migrations: %v", err)
		// TODO:
		// Don't fail the app startup if migrations fail, just log it
		// In production, you might want to be stricter
	}

	log.Println("Database connection established")
	return nil
}

func Close() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
