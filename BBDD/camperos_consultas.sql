use camperos;

-- boton dinámica region / Comunidades
select region.region_name from region 
	join city on region.region_id = city.region_id
group by region.region_name;

-- boton dinámico de provincia
select city.city_name from city 
	join region on region.region_id = city.region_id
group by city.city_name;

-- boton dinámico municipio. Sacar pueblos de un municipio
select town.town_name from town 
	join city on town.city_id = city.city_id
where city.city_name = "Málaga"
group by town.town_id;


select town.town_id from town 
	join city on town.city_id = city.city_id
where city.city_name = "Málaga"
group by town.town_id;

-- localizar una actividad por un pueblo y puntuación
select activity.activity_name, activity.activity_likes from activity
	join town on town.town_id = activity.town_id
where town.town_name = "Alameda";

ALTER TABLE activity
MODIFY activity_name VARCHAR(250);


-- dar like a una actividad: 
UPDATE activity set activity_likes = activity_likes + 1 where activity_id = 0 ; 

-- actividades con más likes por usuario
select activity_name from activity order by activity_like desc;

SELECT * FROM town 
	join city on town.city_id = city.city_id   
    join region on city.region_id = region.region_id 
ORDER BY region.region_name DESC;

select * from activity;


SELECT * FROM town 
	join city on town.city_id = city.city_id
    join region on city.region_id = region.region_id
WHERE town_id =1;

SELECT * FROM activity WHERE town_id = 3;

-- USER
SELECT * FROM user where is_deleted = 0;
-- Incorporar nuevos users: 
-- INSERT INTO user ('nick', 'password', 'telephone', 'img' ) VALUES ();

-- Insertar nueva actividad: 
-- INSERT INTO activity ('activity_name', 'activity_img', 'activity_type', 'activity_likes',  'town_id' ) VALUES ();

