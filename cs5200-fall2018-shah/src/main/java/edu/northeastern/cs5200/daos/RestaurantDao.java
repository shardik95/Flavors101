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

import edu.northeastern.cs5200.models.Customer;
import edu.northeastern.cs5200.models.Owner;
import edu.northeastern.cs5200.models.Restaurant;
import edu.northeastern.cs5200.repositories.CustomerRepository;
import edu.northeastern.cs5200.repositories.OwnerRepository;
import edu.northeastern.cs5200.repositories.RestaurantRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class RestaurantDao {

	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@Autowired
	private OwnerRepository ownerRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@PostMapping("/api/owner/{id}/restaurant")
	public Restaurant createRestaurant(@PathVariable("id") int id,@RequestBody Restaurant restaurant) {
		Owner o = ownerRepository.findById(id).get();
		Restaurant r = new Restaurant();
		r.setName(restaurant.getName());
		r.setLocation(restaurant.getLocation());
		r.setCuisine(restaurant.getCuisine());
		r.setPhone(restaurant.getPhone());
		r.setUrl(restaurant.getUrl());
		r.setOwner(o);
		return restaurantRepository.save(r);
	}
	
	@GetMapping("/api/owner/restaurant/{id}")
	public List<Restaurant> getRestaurants(@PathVariable("id")int id){
		Owner o = ownerRepository.findById(id).get();
		return o.getRestaurants();
	}
	
	@GetMapping("/api/restaurant")
	public List<Restaurant> getAllRestaurants(){
		return (List<Restaurant>) restaurantRepository.findAll();
	}
	
	@GetMapping("/api/restaurant/{id}/reservation")
	public List<Customer> getReserved(@PathVariable("id") int id){
		Restaurant r = restaurantRepository.findById(id).get();
		return r.getReservedCustomers();
	}
	
	@PostMapping("/api/user/{userId}/restaurant/{restId}")
	public Customer createReservation(@PathVariable("userId") int userId,@PathVariable("restId") int restId) {
		
		
		Customer c = customerRepository.findById(userId).get();
		Restaurant r = restaurantRepository.findById(restId).get();
		c.createReservation(r);
		return customerRepository.save(c);
	}
	
	@DeleteMapping("/api/user/{userId}/restaurant/{restId}")
	public Customer cancelReservation(@PathVariable("userId") int userId,@PathVariable("restId") int restId) {
		
		Customer c = customerRepository.findById(userId).get();
		Restaurant r = restaurantRepository.findById(restId).get();
		c.cancelReservation(r);
		return customerRepository.save(c);
	}
	
	@GetMapping("/api/restaurant/{id}")
	public Restaurant getRestaurantById(@PathVariable("id") int id){
		Restaurant r = restaurantRepository.findById(id).get();
		return r;
	}
	
	@DeleteMapping("/api/restaurant/{id}")
	public void deleteRestaurant(@PathVariable("id") int id){
		restaurantRepository.deleteById(id);
		
	}
	
	@PostMapping("/api/owner/restaurant")
	public Restaurant createRest(@RequestBody Restaurant restaurant) {
		Owner o = ((List<Owner>)ownerRepository.findAll()).get(0);
		Restaurant r = new Restaurant();
		r.setName(restaurant.getName());
		r.setLocation(restaurant.getLocation());
		r.setCuisine(restaurant.getCuisine());
		r.setOwner(o);
		return restaurantRepository.save(r);
	}
	
	@PutMapping("/api/restaurant/")
	public Restaurant updateRest(@RequestBody Restaurant restaurant) {
		Owner o = ((List<Owner>)ownerRepository.findAll()).get(0);
		Restaurant r = restaurantRepository.findByName(restaurant.getName()).get(0);
		r.setName(restaurant.getName());
		r.setLocation(restaurant.getLocation());
		r.setCuisine(restaurant.getCuisine());
		r.setOwner(o);
		return restaurantRepository.save(r);
	}
	
	@PutMapping("/api/restaurant/owner")
	public Restaurant updateRestaurant(@RequestBody Restaurant r) {
		Restaurant r1 = restaurantRepository.findById(r.getId()).get();
		r1.setName(r.getName());
		r1.setLocation(r.getLocation());
		r1.setPhone(r.getPhone());
		r1.setUrl(r.getUrl());
		r1.setCuisine(r.getCuisine());
		return restaurantRepository.save(r1);
	}
	
	
	
}
