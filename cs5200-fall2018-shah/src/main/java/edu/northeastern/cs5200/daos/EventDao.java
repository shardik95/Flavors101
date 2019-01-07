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
import edu.northeastern.cs5200.models.Event;
import edu.northeastern.cs5200.models.Manager;
import edu.northeastern.cs5200.models.Restaurant;
import edu.northeastern.cs5200.repositories.CustomerRepository;
import edu.northeastern.cs5200.repositories.EventRepository;
import edu.northeastern.cs5200.repositories.ManagerRepository;
import edu.northeastern.cs5200.repositories.RestaurantRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class EventDao {
	
	@Autowired
	private EventRepository eventRepository;
	
	@Autowired
	private ManagerRepository managerRepository;
	
	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@PostMapping("/api/manager/{managerId}/restaurant/{restId}/event")
	public Event createEvent(@PathVariable("managerId") int id,@RequestBody Event event,@PathVariable("restId")int restId) {
		Manager m = managerRepository.findById(id).get();
		Restaurant r =restaurantRepository.findById(restId).get();
		Event e = new Event();
		e.setEventName(event.getEventName());
		e.setManager(m);
		e.setNoOfPeople(event.getNoOfPeople());
		e.setTime(event.getTime());
		e.setRestaurant(r);
		return eventRepository.save(e);
	}
	
	@GetMapping("/api/manager/{managerId}/event")
	public List<Event> getManagerEvents(@PathVariable("managerId") int id){
		Manager m = managerRepository.findById(id).get();
		return m.getEvents();
	}
	
	@GetMapping("/api/event")
	public List<Event> getEvents(){
		return (List<Event>) eventRepository.findAll();
	}
	
	@PostMapping("/api/customer/{userId}/event/{eventId}")
	public Customer attendEvent(@PathVariable("userId") int userId,@PathVariable("eventId") int eventId) {
		
		Customer c = customerRepository.findById(userId).get();
		Event r = eventRepository.findById(eventId).get();
		c.attendEvent(r);
		return customerRepository.save(c);
	}
	
	@DeleteMapping("/api/customer/{userId}/event/{eventId}")
	public void cancelEvent(@PathVariable("userId") int userId,@PathVariable("eventId") int eventId) {
		Event e = eventRepository.findById(eventId).get();
		Customer c = customerRepository.findById(userId).get();
		c.cancelEvent(e);
		customerRepository.save(c);
	}
	
	@DeleteMapping("/api/event/{id}")
	public void deleteEvent(@PathVariable("id") int id) {
		eventRepository.deleteById(id);	
	}
	
	@PutMapping("/api/event/manager/{id}")
	public Event updateEvent(@PathVariable("id") int id,@RequestBody Event e) {
		Event e1 = eventRepository.findById(e.getId()).get();
		e1.setEventName(e.getEventName());
		e1.setNoOfPeople(e.getNoOfPeople());
		e1.setTime(e.getTime());
		return eventRepository.save(e1);
	}
}
