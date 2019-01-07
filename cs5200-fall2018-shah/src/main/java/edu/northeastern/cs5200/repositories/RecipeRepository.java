package edu.northeastern.cs5200.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.models.Recipe;

public interface RecipeRepository extends CrudRepository<Recipe, Integer>{

}
