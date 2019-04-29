create database AngularChallengedb;
use AngularChallengedb;
describe information;
CREATE TABLE information (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    participacao INT
);
SELECT 
    *
FROM
    information;
SELECT 
    SUM(information.participacao)
FROM
    information;