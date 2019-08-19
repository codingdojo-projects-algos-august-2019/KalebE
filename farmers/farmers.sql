-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema thoughts
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `thoughts` ;

-- -----------------------------------------------------
-- Schema thoughts
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `thoughts` DEFAULT CHARACTER SET utf8 ;
USE `thoughts` ;

-- -----------------------------------------------------
-- Table `thoughts`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `thoughts`.`users` ;

CREATE TABLE IF NOT EXISTS `thoughts`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(255) NULL DEFAULT NULL,
  `lname` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `thoughts`.`farms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `thoughts`.`farms` ;

CREATE TABLE IF NOT EXISTS `thoughts`.`farms` (
  `idfarms` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `location` VARCHAR(45) NULL DEFAULT NULL,
  `acres` FLOAT NULL DEFAULT NULL,
  `price_per_acre` FLOAT NULL DEFAULT NULL,
  `land_value` FLOAT NULL DEFAULT NULL,
  `crop` VARCHAR(45) NULL DEFAULT NULL,
  `crop_price` FLOAT NULL DEFAULT NULL,
  `crop_yield` FLOAT NULL DEFAULT NULL,
  `revenue` FLOAT NULL DEFAULT NULL,
  `expenses` FLOAT NULL DEFAULT NULL,
  `cash_flow` FLOAT NULL DEFAULT NULL,
  `comments` LONGTEXT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idfarms`),
  INDEX `fk_farms_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_farms_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `thoughts`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `thoughts`.`thoughts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `thoughts`.`thoughts` ;

CREATE TABLE IF NOT EXISTS `thoughts`.`thoughts` (
  `idthoughts` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `thoughts` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idthoughts`),
  INDEX `fk_messages_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_messages_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `thoughts`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `thoughts`.`users_likes_thoughts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `thoughts`.`users_likes_thoughts` ;

CREATE TABLE IF NOT EXISTS `thoughts`.`users_likes_thoughts` (
  `users_id` INT(11) NOT NULL,
  `thoughts_id` INT(11) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`users_id`, `thoughts_id`),
  INDEX `fk_messages_has_users_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_messages_has_users_messages1_idx` (`thoughts_id` ASC) VISIBLE,
  CONSTRAINT `fk_messages_has_users_messages1`
    FOREIGN KEY (`thoughts_id`)
    REFERENCES `thoughts`.`thoughts` (`idthoughts`),
  CONSTRAINT `fk_messages_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `thoughts`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
