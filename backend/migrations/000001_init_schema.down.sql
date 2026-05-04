-- Drop triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_oauth_accounts_updated_at ON oauth_accounts;
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
DROP TRIGGER IF EXISTS update_sessions_updated_at ON sessions;

-- Drop function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop indexes
DROP INDEX IF EXISTS idx_sessions_refresh_token;
DROP INDEX IF EXISTS idx_sessions_user_id;
DROP INDEX IF EXISTS idx_perspectives_lean;
DROP INDEX IF EXISTS idx_perspectives_article_id;
DROP INDEX IF EXISTS idx_articles_tags;
DROP INDEX IF EXISTS idx_articles_category_id;
DROP INDEX IF EXISTS idx_articles_status;
DROP INDEX IF EXISTS idx_articles_slug;
DROP INDEX IF EXISTS idx_categories_slug;
DROP INDEX IF EXISTS idx_oauth_accounts_provider;
DROP INDEX IF EXISTS idx_oauth_accounts_user_id;
DROP INDEX IF EXISTS idx_users_email;

-- Drop tables
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS perspectives;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS oauth_accounts;
DROP TABLE IF EXISTS users;
