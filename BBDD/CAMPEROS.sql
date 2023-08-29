CREATE DATABASE camperos;

USE camperos;

create table user (
	user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nick VARCHAR(40) NOT NULL,
    password VARCHAR(100), 
    telephone VARCHAR(50) NOT NULL,
    img varchar(100),
    is_deleted BOOLEAN DEFAULT FALSE
    
);
-- drop table user;
-- drop table activity;
-- drop table user_activity;

create table activity(
	activity_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    activity_name VARCHAR(40) NOT NULL,
    activity_img VARCHAR(100), 
    activity_type VARCHAR(50) NOT NULL,
    activity_likes VARCHAR(100),
    is_deleted BOOLEAN DEFAULT FALSE,
    town_id INT NOT NULL,
    CONSTRAINT town_id_fk_1 FOREIGN KEY (town_id) REFERENCES town(town_id) on delete cascade on update cascade
);
select * from user;
select * from activity;
select * from user_activity;

create table user_activity(
    user_activity_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
	user_id INT UNSIGNED NOT NULL,
    activity_id INT UNSIGNED NOT NULL,
    activity_likes SMALLINT UNSIGNED,      
    CONSTRAINT user_activity_user_fk_1 FOREIGN KEY (user_id) REFERENCES user(user_id) on delete cascade on update cascade,
	CONSTRAINT user_activity_activity_fk_1 FOREIGN KEY(activity_id) REFERENCES activity(activity_id) on delete cascade on update cascade
);

create table town(
	town_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    town_name VARCHAR(100),
    city_id INT NOT NULL,
    CONSTRAINT city_id_fk_1 FOREIGN KEY (city_id) REFERENCES city(city_id) on delete cascade on update cascade
);

create table city(
	city_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    city_name VARCHAR(100),
    region_id INT NOT NULL,
    CONSTRAINT region_id_fk_1 FOREIGN KEY (region_id) REFERENCES region(region_id) on delete cascade on update cascade
);

create table region(
	region_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    region_name VARCHAR(100)
);


