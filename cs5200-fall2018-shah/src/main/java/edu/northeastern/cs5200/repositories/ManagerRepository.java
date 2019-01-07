package edu.northeastern.cs5200.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.models.Manager;

public interface ManagerRepository extends CrudRepository<Manager, Integer>{
	
	@Query("SELECT u FROM Manager u WHERE u.username=:username")
	public Iterable<Manager> findUserByUserName(@Param("username") String u);
	
	@Query("SELECT u FROM Manager u WHERE u.isHired=false")
	public Iterable<Manager> getUnhiredManagers();
}
