CREATE DATABASE IF NOT EXISTS devshowcase
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE devshowcase;

CREATE TABLE IF NOT EXISTS profiles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  bio TEXT NULL,
  github_url VARCHAR(255) NULL,
  linkedin_url VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_profiles_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS technologies (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_technologies_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS projects (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  profile_id INT UNSIGNED NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NULL,
  repository_url VARCHAR(255) NOT NULL,
  demo_url VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_projects_profile
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project_technologies (
  project_id INT UNSIGNED NOT NULL,
  technology_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (project_id, technology_id),
  CONSTRAINT fk_project_technologies_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_project_technologies_technology
    FOREIGN KEY (technology_id) REFERENCES technologies(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS feedbacks (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  author_name VARCHAR(120) NOT NULL,
  comment VARCHAR(1000) NOT NULL,
  rating TINYINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT chk_feedback_rating CHECK (rating IS NULL OR (rating BETWEEN 1 AND 5)),
  CONSTRAINT fk_feedbacks_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Seeds opcionais para testes manuais
INSERT INTO technologies (name)
VALUES ('Node.js'), ('Express'), ('MySQL')
ON DUPLICATE KEY UPDATE name = VALUES(name);
