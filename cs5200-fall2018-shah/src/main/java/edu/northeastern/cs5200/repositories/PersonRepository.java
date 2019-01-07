package edu.northeastern.cs5200.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.models.Person;

public interface PersonRepository extends CrudRepository<Person, Integer> {

	@Query("SELECT u FROM Person u WHERE u.username=:username")
	public Iterable<Person> findUserByUserName(@Param("username") String u);
	
	@Query("SELECT u FROM Person u WHERE (u.username=:username AND u.password=:password)" )
	public Iterable<Person> findByCredentials(@Param("username") String userName,@Param("password") String password);
	
}
