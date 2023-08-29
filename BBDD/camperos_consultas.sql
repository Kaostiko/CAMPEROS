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



