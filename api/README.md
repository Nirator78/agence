php -S localhost:3000 -t .\public\

// Créer toute la bdd

CREATE SCHEMA `agence` ;

CREATE TABLE `agence`.`biens` (
`id` INT NOT NULL,
`titre` VARCHAR(45) NOT NULL,
`description` VARCHAR(255) NOT NULL,
`type_achat` VARCHAR(45) NOT NULL,
`type_bien` VARCHAR(45) NOT NULL,
`prix` INT NULL,
`superficie` DECIMAL(2) NULL,
`nbPiece` INT NULL,
`image` VARCHAR(255) NULL,
PRIMARY KEY (`id`));

ALTER TABLE `agence`.`biens` 
ADD COLUMN `piscine` TINYINT NULL AFTER `image`,
ADD COLUMN `balcon` TINYINT NULL AFTER `piscine`,
ADD COLUMN `terrasse` TINYINT NULL AFTER `balcon`,
ADD COLUMN `cheminee` TINYINT NULL AFTER `terrasse`;

CREATE TABLE `agence`.`rdv` (
`id` INT NOT NULL,
`date` DATETIME NOT NULL,
`user_id` INT NULL,
`bien_id` INT NULL,
PRIMARY KEY (`id`));

CREATE TABLE `agence`.`user` (
`id` INT NOT NULL,
`nom` VARCHAR(45) NULL,
`prenom` VARCHAR(45) NULL,
`email` VARCHAR(45) NULL,
`tel` VARCHAR(45) NULL,
`role` VARCHAR(45) NULL,
`password` VARCHAR(45) NULL,
PRIMARY KEY (`id`));

ALTER TABLE `agence`.`biens` 
RENAME TO  `agence`.`bien` ;

CREATE TABLE `agence`.`image` (
`id` INT NOT NULL,
`url` VARCHAR(45) NULL,
`bien_id` INT NULL,
PRIMARY KEY (`id`));

ALTER TABLE `agence`.`bien` 
DROP COLUMN `image`;

ALTER TABLE `agence`.`bien` 
ADD COLUMN `status` VARCHAR(45) NULL AFTER `cheminée`;

ALTER TABLE `agence`.`rdv` 
ADD COLUMN `status` VARCHAR(45) NULL AFTER `bien_id`;

ALTER TABLE `agence`.`rdv` 
ADD COLUMN `email` VARCHAR(45) NULL AFTER `status`;

ALTER TABLE `agence`.`bien` 
CHANGE COLUMN `cheminée` `cheminee` TINYINT(4) NULL DEFAULT NULL ;
ALTER TABLE `agence`.`bien` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;
ALTER TABLE `agence`.`image` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;
ALTER TABLE `agence`.`rdv` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;
ALTER TABLE `agence`.`user` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;
ALTER TABLE `agence`.`bien` 
CHANGE COLUMN `superficie` `superficie` DECIMAL(10,2) NULL DEFAULT NULL ;
CREATE TABLE `agence`.`client` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company` VARCHAR(45) NOT NULL,
  `apikey` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
ALTER TABLE `agence`.`user` 
CHANGE COLUMN `password` `password` VARCHAR(255) NULL DEFAULT NULL ;
ALTER TABLE `agence`.`rdv` 
ADD COLUMN `nom` VARCHAR(45) NULL AFTER `email`,
ADD COLUMN `prenom` VARCHAR(45) NULL AFTER `nom`,
ADD COLUMN `tel` VARCHAR(45) NULL AFTER `prenom`;

ALTER TABLE `agence`.`bien` 
ADD COLUMN `user_id` INT NULL AFTER `status`;

ALTER TABLE `agence`.`image` 
CHANGE COLUMN `url` `url` VARCHAR(255) NULL DEFAULT NULL ;
