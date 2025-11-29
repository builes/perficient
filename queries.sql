CREATE DATABASE IF NOT EXISTS mars CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  current_quantity INT NOT NULL DEFAULT 0,
  max_quantity INT NOT NULL DEFAULT 100,
  critical_level INT NOT NULL DEFAULT 0
);

CREATE TABLE log_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resource_id INT NOT NULL,
  action VARCHAR(50) NOT NULL,     -- "refill", "consume", etc.
  amount INT NOT NULL,             -- cuánto se sumó o restó
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resource_id) REFERENCES resources(id)
);