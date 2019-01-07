package edu.northeastern.cs5200.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.models.Customer;
import edu.northeastern.cs5200.models.Manager;
import edu.northeastern.cs5200.models.Owner;
import edu.northeastern.cs5200.models.Restaurant;
import edu.northeastern.cs5200.repositories.ManagerRepository;
import edu.northeastern.cs5200.repositories.OwnerRepository;
import edu.northeastern.cs5200.repositories.RestaurantRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class ManagerDao {

	@Autowired
	private ManagerRepository managerRepository;
	
	@Autowired
	private OwnerRepository OwnerRepository;
	
	@Autowired
	private RestaurantRepository restuarantRepository;
	
	@GetMapping("/api/managers/unhired")
	public List<Manager> unhiredManager(){
		List<Manager> managers = (List<Manager>) managerRepository.getUnhiredManagers();
		return managers;
	}
	
	@GetMapping("/api/managers")
	public List<Manager> getAllManagers(){
		return (List<Manager>) managerRepository.findAll();
	}
	
	@PostMapping("/api/owner/{ownerId}/manager/{managerId}/hire/{rest}")
	public Manager hireManager(@PathVariable("ownerId") int ownerId,@PathVariable("managerId") int managerId,@PathVariable("rest") String rest) {
		Restaurant r = restuarantRepository.findByName(rest).get(0);
		
		Manager m = managerRepository.findById(managerId).get();
		Owner o = OwnerRepository.findById(ownerId).get();
		m.setHired(true);
		m.setOwner(o);
		m.setRestaurant(r);
		return managerRepository.save(m);
	}
	
	@GetMapping("/api/owner/{ownerId}/manager/hire")
	public List<Manager> gethireManager(@PathVariable("ownerId") int ownerId) {
		Owner o = OwnerRepository.findById(ownerId).get();
		return o.getManagers();
	}
	
	@GetMapping("/api/manager/{id}/restaurant")
	public Restaurant getManagerById(@PathVariable("id")int id) {
		return managerRepository.findById(id).get().getRestaurant();
		
	}
	
	@GetMapping("/api/manager/{id}")
	public Manager getManager(@PathVariable("id")int id) {
		return managerRepository.findById(id).get();
		
	}
}
