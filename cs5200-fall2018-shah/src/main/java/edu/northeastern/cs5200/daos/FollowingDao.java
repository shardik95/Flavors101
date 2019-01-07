package edu.northeastern.cs5200.daos;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.models.Chef;
import edu.northeastern.cs5200.models.Customer;
import edu.northeastern.cs5200.models.Following;
import edu.northeastern.cs5200.models.Person;
import edu.northeastern.cs5200.repositories.ChefRepository;
import edu.northeastern.cs5200.repositories.CustomerRepository;
import edu.northeastern.cs5200.repositories.FollowingRepository;
import edu.northeastern.cs5200.repositories.PersonRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class FollowingDao {
	
	@Autowired
	private FollowingRepository followingRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private PersonRepository personRepository;
	
	@Autowired
	private ChefRepository chefRepository;

	@PostMapping("/api/user/following/{userId}")
	public Following addFollowing(@PathVariable("userId") int meFollowing,@RequestBody Person me) {
		Person p = personRepository.findById(meFollowing).get();
		
		Following following = new Following();
		following.setPerson(me);
		following.setMyid(meFollowing);
		following.setRole(me.getRole());
		following.setFirstName(p.getFirstName());
		return followingRepository.save(following);
	}
	
	@PostMapping("/api/customer/following/{userId}")
	public boolean isFollowing(@PathVariable("userId") int meFollowing,@RequestBody Customer me) {
		List<Following> following = me.getFollowing();
		for(Following f:following) {
			if(f.getMyid()==meFollowing)
				return true;
		}
		return false;
	}
	
	@PostMapping("/api/chef/following/{userId}")
	public boolean isFollowing(@PathVariable("userId") int meFollowing,@RequestBody Chef me) {
		List<Following> following = me.getFollowing();
		for(Following f:following) {
			if(f.getMyid()==meFollowing)
				return true;
		}
		return false;
	}
	
	@GetMapping("/api/user/{userId}/following")
	public List<Following> getFollowing(@PathVariable("userId") int id){
		Person p = personRepository.findById(id).get();
		if(p.getRole().equals("Customer")) {
			Customer c = customerRepository.findById(id).get();
			return c.getFollowing();
		}else if(p.getRole().equals("Chef")) {
			Chef c = chefRepository.findById(id).get();
			return c.getFollowing();
		}
		return null;
	}
	
	@DeleteMapping("/api/customer/following/{userId}")
	public Customer removeFollowing(@PathVariable("userId") int meFollowing,@RequestBody Customer me) {
		List<Following> following = me.getFollowing();
		List<Following> followingNew = new ArrayList<>();
		for(Following f:following) {
			if(f.getMyid()==meFollowing)
				followingRepository.deleteById(f.getId());
			else {
				followingNew.add(f);
			}
		}
		me.setFollowing(followingNew);
		return customerRepository.save(me);
	}
	
}
