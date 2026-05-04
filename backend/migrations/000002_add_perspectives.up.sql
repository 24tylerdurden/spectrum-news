CREATE TABLE IF NOT EXISTS perspectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    lean VARCHAR(20) NOT NULL CHECK (lean IN ('left', 'right', 'center', 'neutral')),
    lean_score SMALLINT CHECK (lean_score BETWEEN -10 AND 10),
    headline VARCHAR(512) NOT NULL,
    summary TEXT NOT NULL,
    body TEXT,
    source_name VARCHAR(255),
    source_url TEXT,
    sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'negative', 'neutral')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);