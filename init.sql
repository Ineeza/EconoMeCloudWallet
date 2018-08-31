/* Initialize a database */
DROP DATABASE IF EXISTS econome;
CREATE DATABASE econome;

/* Initialize tables */
CREATE TABLE IF NOT EXISTS inherit_base_transaction (
created_date  TIMESTAMP WITHOUT TIME ZONE default NOW(),
updated_date  TIMESTAMP WITHOUT TIME ZONE,
created_by    TEXT default current_user,
updated_by    TEXT
);

CREATE TABLE IF NOT EXISTS account (
id         BIGSERIAL NOT NULL PRIMARY KEY,
email      TEXT UNIQUE,
user_name   TEXT,
password   TEXT,
user_type  TEXT
) INHERITS(inherit_base_transaction);

CREATE TABLE IF NOT EXISTS keystore (
id       BIGSERIAL NOT NULL PRIMARY KEY,
account_id  BIGINT UNIQUE,
content  TEXT
) INHERITS(inherit_base_transaction);

/* Insert seed data */
INSERT INTO account(
email,
user_name,
password,
user_type
) VALUES (
'account_1@example.com',
'account_1',
'$2a$10$AyapIgTC3hWgg9uKo3LuSOZNK/DFPPzD2AXhNdoMELYxQjw3qujau',
'admin'
);

INSERT INTO account(
email,
user_name,
password,
user_type
) VALUES (
'account_2@example.com',
'account_2',
'$2a$10$AyapIgTC3hWgg9uKo3LuSOZNK/DFPPzD2AXhNdoMELYxQjw3qujau',
'admin'
);

INSERT INTO account(
email,
user_name,
password,
user_type
) VALUES (
'account_3@example.com',
'account_3',
'$2a$10$AyapIgTC3hWgg9uKo3LuSOZNK/DFPPzD2AXhNdoMELYxQjw3qujau',
'admin'
);
