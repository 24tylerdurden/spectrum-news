# Biased India Backend

Backend API for the Biased India news platform.

## Setup

### Prerequisites
- Go 1.21 or higher
- PostgreSQL database
- golang-migrate CLI (for manual migrations)

### Installation

1. Install dependencies:
```bash
go mod download
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
PORT=8080
GIN_MODE=debug
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8080/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
MIGRATIONS_PATH=./migrations
```

3. Set up the database:
```bash
createdb indian_biased
```

4. Run migrations (automatic on startup, or manual):
```bash
# Automatic - migrations run when the app starts
go run main.go

# Manual - using make
make migrate-up

# Manual - using CLI
migrate -path ./migrations -database $DATABASE_URL up
```

See [MIGRATIONS.md](./MIGRATIONS.md) for detailed migration documentation.

## Running the Server

### Development
```bash
go run main.go
```

### Production
```bash
go build -o main .
./main
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Get Google OAuth URL
- `GET /api/auth/google/callback` - Google OAuth callback
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)

### Articles
- `GET /api/articles` - List articles (with optional filters)
- `GET /api/articles/:slug` - Get article by slug with perspectives
- `POST /api/articles` - Create article (requires auth)
- `POST /api/articles/:id/publish` - Publish article (requires auth)

### Perspectives
- `POST /api/perspectives` - Create perspective (requires auth)

### Categories
- `GET /api/categories` - List categories

### Health
- `GET /health` - Health check endpoint

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to APIs & Services → Credentials
4. Create OAuth 2.0 Client ID credentials
5. Add the following authorized redirect URIs:
   - `http://localhost:8080/api/auth/google/callback`
6. Copy Client ID and Client Secret to your `.env` file

## Project Structure

```
backend/
├── auth/              # JWT and password utilities
├── database/          # Database connection and migrations
├── handlers/          # API handlers
├── middleware/        # Auth and CORS middleware
├── models/            # Data models
├── migrations/        # Database migration files
├── migrate/           # Migration runner
├── main.go            # Entry point
└── Makefile           # Build and migration commands
