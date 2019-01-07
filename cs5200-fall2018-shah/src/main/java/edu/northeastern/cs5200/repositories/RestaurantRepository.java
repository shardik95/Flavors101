package edu.northeastern.cs5200.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.models.Restaurant;

public interface RestaurantRepository extends CrudRepository<Restaurant, Integer>{

	@Query("SELECT u FROM Restaurant u WHERE u.name=:username")
	public List<Restaurant> findByName(@Param("username") String u);
}
