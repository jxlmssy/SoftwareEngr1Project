-- S1-DBA-04
-- Password Reset Token Table

CREATE TABLE IF NOT EXISTS password_reset_token (
    reset_id SERIAL PRIMARY KEY,

    user_id UUID NOT NULL REFERENCES app_users(id),

    token_hash TEXT NOT NULL,

    expires_at TIMESTAMPTZ NOT NULL,

    is_used BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS password_reset_token_token_hash_idx
    ON password_reset_token (token_hash);