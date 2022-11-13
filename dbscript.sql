-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bankingdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bankingdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bankingdb` DEFAULT CHARACTER SET utf8 ;
USE `bankingdb` ;

-- -----------------------------------------------------
-- Table `bankingdb`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bankingdb`.`customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(60) NOT NULL,
  `last_name` VARCHAR(60) NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE INDEX `cust_id_UNIQUE` (`customer_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bankingdb`.`accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bankingdb`.`accounts` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `balance` INT NOT NULL,
  `customer_id` INT NOT NULL,
  UNIQUE INDEX `acc_id_UNIQUE` (`account_id` ASC) VISIBLE,
  PRIMARY KEY (`account_id`),
  INDEX `fk_accounts_customers1_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_accounts_customers1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `bankingdb`.`customers` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bankingdb`.`transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bankingdb`.`transaction` (
  `transaction_id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `amount` INT NOT NULL,
  `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mainAccount` INT NOT NULL,
  `otherAccount` INT NULL,
  INDEX `fk_transaction_accounts1_idx` (`mainAccount` ASC) VISIBLE,
  INDEX `fk_transaction_accounts2_idx` (`otherAccount` ASC) VISIBLE,
  PRIMARY KEY (`transaction_id`),
  CONSTRAINT `fk_transaction_accounts1`
    FOREIGN KEY (`mainAccount`)
    REFERENCES `bankingdb`.`accounts` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_accounts2`
    FOREIGN KEY (`otherAccount`)
    REFERENCES `bankingdb`.`accounts` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

insert into customers values(1,"Anuwat","Pattanajan","anuwat.34671@mail.kmutt.ac.th","$2b$15$s1dRr5Nan1Ic3GyhjwnSjubJr.7hxHLki6hqXeCehfOg/V2eqMf5e"),
(2,"Angela","Mcmanus","angela.mc@mail.kmutt.ac.th","$2b$15$FvkQwgttNnnw3jRqT7cIGOAIPK72HvTpAi1fUE2Bt6oqsaio473Cm"),
(3,"Donna","Lake","donna@gmail.com","$2b$15$FmCQl94Sq3y0sJHQPewOYuB33QX.SVluPYIfE/iYJWRqxAW3mKs6q"),
(4,"Eric","Hoover","eric.2525@hotmail.com","$2b$15$NTfgPK2j7C9NOoAK0nOxreikm0abCCjzikGIwBiYE05mZBYNS/qPC");

insert into accounts
values(1,15000,3),(2,20000,4),(3,1000,1),(4,500,3),(5,750,1),(6,25000,2);