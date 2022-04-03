\c postgres 

CREATE DATABASE client_app;
DROP DATABASE client_app;
\c client_app

CREATE TABLE IF NOT EXISTS user_app(
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(100) NOT NULL
);

SELECT * FROM user_app ORDER BY id_user;
DROP TABLE user_app;

CREATE TABLE IF NOT EXISTS user_app_data(
    id_data SERIAL PRIMARY KEY,
    title VARCHAR(100),
    anotation VARCHAR(100),
    id_user_app_data INT,
    FOREIGN KEY (id_user_app_data) REFERENCES user_app(id_user)
);

SELECT * FROM user_app_data ORDER BY id_data;
DROP TABLE user_app_data;

CREATE VIEW select_data AS
SELECT u.id_user, 
       u.username, 
       u.email, 
       d.title, 
       d.anotation
FROM  user_app u 
INNER JOIN user_app_data d
ON id_user = id_user_app_data;

SELECT * FROM select_data ORDER BY id_user;
DROP VIEW select_data;


INSERT INTO user_app VALUES(1,'devjunior89','devjunior@gmail.com.br','asd215a4sd');
INSERT INTO user_app_data VALUES(1,'data type','new skills from node.js',1);
