CREATE TABLE "session" (
"sid" varchar NOT NULL COLLATE "default",
"sess" json NOT NULL,
"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE TABLE "users" (
"id" bigserial PRIMARY KEY,
"username" varchar(255) UNIQUE,
"password" varchar(100),
"type" varchar(50)
);

CREATE TABLE "keystores" (
"id" bigserial PRIMARY KEY,
"user_id" varchar(255) UNIQUE,
"content" TEXT
);

INSERT INTO users(username, password, type) VALUES ('takemon', '$2a$10$AyapIgTC3hWgg9uKo3LuSOZNK/DFPPzD2AXhNdoMELYxQjw3qujau', 'admin');
INSERT INTO users(username, password, type) VALUES ('user_1', '$2a$10$AyapIgTC3hWgg9uKo3LuSOZNK/DFPPzD2AXhNdoMELYxQjw3qujau', 'admin');
INSERT INTO users(username, password, type) VALUES ('user_2', '$2a$10$AyapIgTC3hWgg9uKo3LuSOZNK/DFPPzD2AXhNdoMELYxQjw3qujau', 'admin');

INSERT INTO users(username, password, type) VALUES ('user_3', '$2a$10$AyapIgTC3hWgg9uKo3LuSOZNK/DFPPzD2AXhNdoMELYxQjw3qujau', 'admin');
INSERT INTO users(username, password, type) VALUES ('user_4', '$2a$10$AyapIgTC3hWgg9uKo3LuSOZNK/DFPPzD2AXhNdoMELYxQjw3qujau', 'admin');
INSERT INTO users(username, password, type) VALUES ('user_5', '$2a$10$AyapIgTC3hWgg9uKo3LuSOZNK/DFPPzD2AXhNdoMELYxQjw3qujau', 'admin');
