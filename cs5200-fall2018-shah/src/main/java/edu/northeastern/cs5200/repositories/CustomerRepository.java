package edu.northeastern.cs5200.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.models.Customer;


public interface CustomerRepository extends CrudRepository<Customer, Integer>{

	@Query("SELECT u FROM Customer u WHERE u.username=:username")
	public Iterable<Customer> findUserByUserName(@Param("username") String u);
	
	@Query("SELECT u FROM Customer u Where u.username LIKE %:query% OR u.firstName LIKE %:query%")
	public List<Customer> getCustomerByUsernameOrFirstName(@Param("query") String query);
}
