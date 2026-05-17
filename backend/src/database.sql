CREATE DATABASE seguranca;

USE seguranca;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

ALTER TABLE users ADD reset_token VARCHAR(255) NULL;
ALTER TABLE users ADD reset_token_expiry DATETIME NULL;