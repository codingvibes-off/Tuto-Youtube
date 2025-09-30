ALTER TABLE users
ADD COLUMN enabled BOOLEAN DEFAULT FALSE;

ALTER TABLE users
ADD COLUMN version BIGINT NOT NULL DEFAULT 1;

CREATE TABLE otp (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(6) NOT NULL,
    expiration TIMESTAMP NOT NULL,
    user_id UUID NOT NULL,
    CONSTRAINT fk_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

