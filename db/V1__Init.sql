CREATE TABLE IF NOT EXISTS account (
id            BIGSERIAL NOT NULL PRIMARY KEY,
email         TEXT UNIQUE,
user_name     TEXT,
password      TEXT,
user_type     TEXT,
created_date  TIMESTAMP WITHOUT TIME ZONE default NOW(),
updated_date  TIMESTAMP WITHOUT TIME ZONE,
created_by    TEXT default current_user,
updated_by    TEXT
);

CREATE TABLE IF NOT EXISTS keystore (
id            BIGSERIAL NOT NULL PRIMARY KEY,
account_id    BIGINT UNIQUE,
content       TEXT,
created_date  TIMESTAMP WITHOUT TIME ZONE default NOW(),
updated_date  TIMESTAMP WITHOUT TIME ZONE,
created_by    TEXT default current_user,
updated_by    TEXT
);
