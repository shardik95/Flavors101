package edu.northeastern.cs5200.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.models.Ingredient;
import edu.northeastern.cs5200.repositories.IngredientRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class IngredientDao {
	
	@Autowired
	private IngredientRepository ingredientRepository;
	
	@PostMapping("/api/ingredient")
	public Ingredient createIngredient(@RequestBody Ingredient ingredient) {
		Ingredient i = new Ingredient();
		i.setName(ingredient.getName());
		i.setNutrition(ingredient.getNutrition());
		i.setType(ingredient.getType());
		return ingredientRepository.save(i);
	}
	
	@GetMapping("/api/ingredient")
	public List<Ingredient> getIngredients(){
		return (List<Ingredient>) ingredientRepository.findAll();
	}
	
	@DeleteMapping("/api/ingredient/{id}")
	public int deleteIngredient(@PathVariable("id") int id) {
		ingredientRepository.deleteById(id);
		return 1;
	}

	@PutMapping("/api/ingredient/update")
	public Ingredient updateIngredient(@RequestBody Ingredient ingredient) {
		
		Ingredient i = ingredientRepository.findById(ingredient.getId()).get();
		i.setName(ingredient.getName());
		i.setNutrition(ingredient.getNutrition());
		i.setType(ingredient.getType());
		System.out.println(i.getName());
		return ingredientRepository.save(i);
	}
	
}
