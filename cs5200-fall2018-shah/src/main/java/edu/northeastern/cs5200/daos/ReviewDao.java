package edu.northeastern.cs5200.daos;

import java.util.ArrayList;
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
import edu.northeastern.cs5200.models.Restaurant;
import edu.northeastern.cs5200.models.Review;
import edu.northeastern.cs5200.repositories.CustomerRepository;
import edu.northeastern.cs5200.repositories.RestaurantRepository;
import edu.northeastern.cs5200.repositories.ReviewRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class ReviewDao {

	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private RestaurantRepository RestaurantRepository;
	
	@PostMapping("api/review/{userId}/restaurant/{restName}")
	public Review createReview(@PathVariable("userId") int userId,@PathVariable("restName") String restName,@RequestBody Review rev) {
		Customer c = customerRepository.findById(userId).get();
		Restaurant r = RestaurantRepository.findByName(restName).get(0);
		Review review = new Review();
		review.setCustomer(c);
		review.setRestaurant(r);
		review.setReview(rev.getReview());
		return reviewRepository.save(review);
	}
	
	@GetMapping("api/review/{userId}")
	public List<Review> getReview(@PathVariable("userId") int id){
		Customer c = customerRepository.findById(id).get();
		List<Review> rev = new ArrayList<>();
		for(Review r:c.getReviews()) {
			Review rtemp = reviewRepository.findById(r.getId()).get();
			r.setRestaurant(rtemp.getRestaurant());
			r.setCustomer(rtemp.getCustomer());
			rev.add(r);
		}
		return rev;
	}
	
	@GetMapping("api/review/restaurant/{id}")
	public List<Review> getReviewRestaurant(@PathVariable("id") int id){
		Restaurant c = RestaurantRepository.findById(id).get();
		List<Review> rev = new ArrayList<>();
		for(Review r:c.getReviews()) {
			Review rtemp = reviewRepository.findById(r.getId()).get();
			r.setRestaurant(rtemp.getRestaurant());
			r.setCustomer(rtemp.getCustomer());
			rev.add(r);
		}
		return rev;
	}
	
	@DeleteMapping("api/review/{id}")
	public int deleteReview(@PathVariable("id") int id) {
		reviewRepository.deleteById(id);
		return 1;
	}
	
	@PutMapping("api/review/{userId}/restaurant/{restName}")
	public Review updateReview(@PathVariable("userId") int userId,@PathVariable("restName") String restName,@RequestBody Review rev) {
		Customer c = customerRepository.findById(userId).get();
		Restaurant r = RestaurantRepository.findByName(restName).get(0);
		Review review = reviewRepository.findById(rev.getId()).get();
		review.setCustomer(c);
		review.setRestaurant(r);
		review.setReview(rev.getReview());
		return reviewRepository.save(review);
	}
	
	@PutMapping("api/review")
	public Review updateReview1(@RequestBody Review rev) {
		
		Review review = reviewRepository.findById(rev.getId()).get();
		review.setReview(rev.getReview());
		return reviewRepository.save(review);
	}
	
	@GetMapping("/api/review")
	public List<Review> getAllReviews(){
		return (List<Review>) reviewRepository.findAll();
	}
}
