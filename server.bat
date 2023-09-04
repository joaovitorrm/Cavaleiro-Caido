@echo off

cd C:\xampp

start "XAMPP Control Panel" xampp-control.exe

timeout /t 10 /nobreak > NUL

@echo SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE SCHEMA IF NOT EXISTS `cavaleiro` DEFAULT CHARACTER SET utf8 ;
USE `cavaleiro` ;

-- -----------------------------------------------------
-- Table `cavaleiro`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cavaleiro`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `email` VARCHAR(100) NULL,
  `senha` VARCHAR(255) NULL,
  `cargo` ENUM('admin', 'user') NULL,
  `imagemURL` VARCHAR(45) NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;>"C:\xampp\script.sql"

mysql_start.bat

timeout /t 10 /nobreak > NUL

cd mysql\bin

mysql -u root -e "source C:\xampp\script.sql"

pause
