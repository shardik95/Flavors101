package edu.northeastern.cs5200.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.models.Chef;
import edu.northeastern.cs5200.models.Manager;
import edu.northeastern.cs5200.models.Owner;
import edu.northeastern.cs5200.models.Restaurant;
import edu.northeastern.cs5200.repositories.ChefRepository;
import edu.northeastern.cs5200.repositories.OwnerRepository;
import edu.northeastern.cs5200.repositories.RestaurantRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class ChefDao {
	
	@Autowired
	private ChefRepository chefRepository;
	
	@Autowired
	private OwnerRepository ownerRepository;
	
	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@GetMapping("/api/chef/unhired")
	public List<Chef> unhiredManager(){
		List<Chef> chefs = (List<Chef>) chefRepository.getUnhiredChefs();
		return chefs;
	}
	
	@PutMapping("/api/owner/{ownerId}/chef/{chefId}/hire/{rest}")
	public Chef hireChef(@PathVariable("ownerId") int ownerId,@PathVariable("chefId") int chefId,@PathVariable("rest") String rest) {
		
		Restaurant r = restaurantRepository.findByName(rest).get(0);
		Chef m = chefRepository.findById(chefId).get();
		Owner o = ownerRepository.findById(ownerId).get();
		m.setHired(true);
		m.setOwner(o);
		m.setRestaurant(r);
		return chefRepository.save(m);
	}
	
	@GetMapping("/api/owner/{ownerId}/chef/hire")
	public List<Chef> gethireChef(@PathVariable("ownerId") int ownerId) {
		Owner o = ownerRepository.findById(ownerId).get();
		return o.getChefs();
	}
	
	@GetMapping("/api/chef/{id}/restaurant")
	public Restaurant getChefRestaurant(@PathVariable("id")int id) {
		return chefRepository.findById(id).get().getRestaurant();
	}
	
	@GetMapping("/api/chef/{id}")
	public Chef getChef(@PathVariable("id")int id) {
		return chefRepository.findById(id).get();
	}
	
	
	@GetMapping("/api/chefs")
	public List<Chef> getAllChefs(){
		return (List<Chef>) chefRepository.findAll();
	}
}
