DROP TABLE IF EXISTS chatMessages;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS password_reset_codes;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      profile_pic_url VARCHAR(255),
      bio VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

CREATE TABLE password_reset_codes(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      code VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

CREATE TABLE friendships( 
  id SERIAL PRIMARY KEY, 
  sender_id INT REFERENCES users(id) NOT NULL,
  recipient_id INT REFERENCES users(id) NOT NULL,
  accepted BOOLEAN DEFAULT false
  );

CREATE TABLE chatMessages(
      id SERIAL PRIMARY KEY,
      message TEXT NOT NULL,
      user_id INT REFERENCES users(id) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );


INSERT INTO chatMessages (user_id, message) VALUES ('145', 'Hey everyone, nice to meet you...');
INSERT INTO chatMessages (user_id, message) VALUES ('101', 'Hello there!');