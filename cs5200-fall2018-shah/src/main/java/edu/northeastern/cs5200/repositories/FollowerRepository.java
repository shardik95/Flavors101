package edu.northeastern.cs5200.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.models.Follower;

public interface FollowerRepository extends CrudRepository<Follower, Integer>{
	
}
