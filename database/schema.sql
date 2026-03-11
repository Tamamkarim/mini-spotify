CREATE DATABASE mini_spotify;

USE mini_spotify;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE artists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE albums (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  artist_id INT,
  cover_image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (artist_id) REFERENCES artists(id)
);

CREATE TABLE songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  artist_id INT,
  album_id INT,
  audio_url VARCHAR(255),
  cover_image VARCHAR(255),
  description TEXT,
  plays INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (artist_id) REFERENCES artists(id),
  FOREIGN KEY (album_id) REFERENCES albums(id)
);

CREATE TABLE likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  song_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (song_id) REFERENCES songs(id)
);

CREATE TABLE playlists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE playlist_songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  playlist_id INT,
  song_id INT,
  FOREIGN KEY (playlist_id) REFERENCES playlists(id),
  FOREIGN KEY (song_id) REFERENCES songs(id)
);