package edu.northeastern.cs5200.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.models.Owner;

public interface OwnerRepository extends CrudRepository<Owner, Integer>{

	@Query("SELECT u FROM Owner u WHERE u.username=:username")
	public Iterable<Owner> findUserByUserName(@Param("username") String u);
}
