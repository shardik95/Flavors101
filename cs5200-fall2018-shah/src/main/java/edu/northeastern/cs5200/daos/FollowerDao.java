package edu.northeastern.cs5200.daos;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.models.Customer;
import edu.northeastern.cs5200.models.Follower;
import edu.northeastern.cs5200.models.Following;
import edu.northeastern.cs5200.models.Person;
import edu.northeastern.cs5200.repositories.CustomerRepository;
import edu.northeastern.cs5200.repositories.FollowerRepository;
import edu.northeastern.cs5200.repositories.PersonRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class FollowerDao {

	@Autowired
	private FollowerRepository followerRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private PersonRepository personRepository;

	@PostMapping("/api/user/follower/{userId}")
	public Follower addFollower(@PathVariable("userId") int Follower,@RequestBody Person me) {
		Person p = personRepository.findById(Follower).get();
		
		Follower follow = new Follower();
		follow.setPerson(me);
		follow.setMyid(Follower);
		follow.setRole(me.getRole());
		follow.setFirstName(p.getFirstName());
		return followerRepository.save(follow);
	}
	
	@GetMapping("/api/user/{userId}/follower")
	public List<Follower> getFollowing(@PathVariable("userId") int id){
		Customer c = customerRepository.findById(id).get();
		return c.getFollowers();
	}
	
	@DeleteMapping("/api/customer/follower/{userId}")
	public Customer removeFollower(@PathVariable("userId") int follower,@RequestBody Customer me) {
		//System.out.println(x);
		List<Follower> followerList = me.getFollowers();
		List<Follower> followerNew = new ArrayList<>();
		for(Follower f:followerList) {
			if(f.getMyid()==follower)
				followerRepository.deleteById(f.getId());
			else {
				followerNew.add(f);
			}
		}
		me.setFollowers(followerNew);
		return customerRepository.save(me);
	}
	
	
}
