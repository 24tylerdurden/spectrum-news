-- Add description column to articles table
ALTER TABLE articles ADD COLUMN description TEXT;

-- Add description to the down migration as well
