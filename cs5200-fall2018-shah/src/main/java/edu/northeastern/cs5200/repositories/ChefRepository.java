package edu.northeastern.cs5200.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.models.Chef;


public interface ChefRepository extends CrudRepository<Chef, Integer>{
	
	@Query("SELECT u FROM Chef u WHERE u.username=:username")
	public Iterable<Chef> findUserByUserName(@Param("username") String u);
	
	@Query("SELECT u FROM Chef u Where u.username LIKE %:query% OR u.firstName LIKE %:query%")
	public List<Chef> getChefByUsernameOrFirstName(@Param("query") String query);
	
	@Query("SELECT u FROM Chef u WHERE u.isHired=false")
	public Iterable<Chef> getUnhiredChefs();
}
