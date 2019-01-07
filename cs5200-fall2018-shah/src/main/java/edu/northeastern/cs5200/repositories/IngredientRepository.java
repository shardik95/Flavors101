package edu.northeastern.cs5200.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.models.Ingredient;

public interface IngredientRepository extends CrudRepository<Ingredient, Integer>{

}
