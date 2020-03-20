
CREATE TABLE IF NOT EXISTS people (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` varchar(50) UNIQUE,
  `realname` varchar(256),
  `adminrole` varchar(50),
  `password` varchar(50),
  PRIMARY KEY (`id`)
) 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;


CREATE TABLE IF NOT EXISTS recognitions (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` varchar(50),
  `recognition` varchar(50),
  `date` DATETIME,
  `by_user` varchar(50),
  `using_password` varchar(50),
  UNIQUE KEY `unique_index` (`username`, `recognition`),
  PRIMARY KEY (`id`)
) 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
