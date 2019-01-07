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

import edu.northeastern.cs5200.models.Chef;
import edu.northeastern.cs5200.models.Ingredient;
import edu.northeastern.cs5200.models.Recipe;
import edu.northeastern.cs5200.repositories.ChefRepository;
import edu.northeastern.cs5200.repositories.RecipeRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class RecipeDao {

	@Autowired
	private RecipeRepository recipeRepository;
	
	@Autowired
	private ChefRepository chefRepository;
	
	@PostMapping("/api/recipie/{id}")
	public Recipe createIngredient(@RequestBody Recipe recipe,@PathVariable("id") int id) {
		Chef c = chefRepository.findById(id).get();
		Recipe r = new Recipe();
		r.setName(recipe.getName());
		r.setCookTime(recipe.getCookTime());
		r.setPrepTime(recipe.getPrepTime());
		r.setSteps(recipe.getSteps());
		r.setChef(c);
		return recipeRepository.save(r);
	}
	
	@GetMapping("/api/recipie/chef/{id}")
	public List<Recipe> getRecipeForChef(@PathVariable("id") int id){
		Chef c = chefRepository.findById(id).get();
		return c.getRecipies();
	}
	
	@DeleteMapping("/api/recipe/{id}")
	public int deleteRecipe(@PathVariable("id") int id) {
		recipeRepository.deleteById(id);
		return 1;
	}

	@PutMapping("/api/recipe/update")
	public Recipe updateRecipe(@RequestBody Recipe recipe) {
		
		Recipe r = recipeRepository.findById(recipe.getId()).get();
		r.setName(recipe.getName());
		r.setCookTime(recipe.getCookTime());
		r.setPrepTime(recipe.getPrepTime());
		r.setSteps(recipe.getSteps());
		
		return recipeRepository.save(r);
	}
	
}
