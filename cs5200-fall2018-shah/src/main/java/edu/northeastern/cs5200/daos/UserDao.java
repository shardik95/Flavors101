package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

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
import edu.northeastern.cs5200.models.Customer;
import edu.northeastern.cs5200.models.Manager;
import edu.northeastern.cs5200.models.Owner;
import edu.northeastern.cs5200.models.Person;
import edu.northeastern.cs5200.repositories.ChefRepository;
import edu.northeastern.cs5200.repositories.CustomerRepository;
import edu.northeastern.cs5200.repositories.ManagerRepository;
import edu.northeastern.cs5200.repositories.OwnerRepository;
import edu.northeastern.cs5200.repositories.PersonRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class UserDao {

		@Autowired
		private ChefRepository chefRepository;
		
		@Autowired
		private CustomerRepository customerRepository;
		
		@Autowired
		private ManagerRepository managerRepository;
		
		@Autowired
		private OwnerRepository ownerRepository;
		
		@Autowired
		private PersonRepository personRepository;
		
		@PostMapping("/api/customer/signup")
		public Customer createCustomer(@RequestBody Customer customer,HttpSession session) {
			List<Person> person = (List<Person>) personRepository.findUserByUserName(customer.getUsername());
			if(person.size()>0)
				return null;
			else {
				
				Customer c = new Customer();
				c.setUsername(customer.getUsername());
				c.setFirstName(customer.getFirstName());
				c.setPassword(customer.getPassword());
				c.setLastName(customer.getLastName());
				c.setAddress(customer.getAddress());
				c.setPhone(customer.getPhone());
				c.setEmail(customer.getEmail());
				c.setRole("Customer");
				session.setAttribute("currentUser", customer);
				return customerRepository.save(c);
			}
		}
		
		@PutMapping("/api/customer/signup")
		public Customer updateCustomer(@RequestBody Person p,HttpSession session) {
			List<Customer> users=(List<Customer>) customerRepository.findUserByUserName(p.getUsername());
			if(users.size()>0) {
				Customer user=users.get(0);
				user.setFirstName(p.getFirstName());
				user.setLastName(p.getLastName());
				user.setPhone(p.getPhone());
				user.setPassword(p.getPassword());
				user.setRole("Customer");
				customerRepository.save(user);
				session.setAttribute("currentUser", user);
				return user;
			}
			return null;
		}
		
		@PutMapping("/api/manager/signup")
		public Manager updateManager(@RequestBody Manager p,HttpSession session) {
			List<Manager> users=(List<Manager>) managerRepository.findUserByUserName(p.getUsername());
			if(users.size()>0) {
				Manager user=users.get(0);
				user.setFirstName(p.getFirstName());
				user.setLastName(p.getLastName());
				user.setPhone(p.getPhone());
				user.setPassword(p.getPassword());
				user.setRole("Manager");
				managerRepository.save(user);
				session.setAttribute("currentUser", user);
				return user;
			}
			return null;
		}
		
		@PutMapping("/api/owner/signup")
		public Owner updateOwner(@RequestBody Owner p,HttpSession session) {
			List<Owner> users=(List<Owner>) ownerRepository.findUserByUserName(p.getUsername());
			if(users.size()>0) {
				Owner user=users.get(0);
				user.setFirstName(p.getFirstName());
				user.setLastName(p.getLastName());
				user.setPhone(p.getPhone());
				user.setPassword(p.getPassword());
				user.setRole("Owner");
				ownerRepository.save(user);
				session.setAttribute("currentUser", user);
				return user;
			}
			return null;
		}
		
		@PutMapping("/api/chef/signup")
		public Chef updateChef(@RequestBody Chef p,HttpSession session) {
			List<Chef> users=(List<Chef>) chefRepository.findUserByUserName(p.getUsername());
			if(users.size()>0) {
				Chef user=users.get(0);
				user.setFirstName(p.getFirstName());
				user.setLastName(p.getLastName());
				user.setPhone(p.getPhone());
				user.setPassword(p.getPassword());
				user.setRole("Chef");
				chefRepository.save(user);
				session.setAttribute("currentUser", user);
				return user;
			}
			return null;
		}
		
		@PostMapping("/api/chef/signup")
		public Chef createChef(@RequestBody Chef chef,HttpSession session) {
			List<Person> person = (List<Person>) personRepository.findUserByUserName(chef.getUsername());
			if(person.size()>0)
				return null;
			else {
				
				Chef c = new Chef();
				c.setUsername(chef.getUsername());
				c.setFirstName(chef.getFirstName());
				c.setPassword(chef.getPassword());
				c.setLastName(chef.getLastName());
				c.setAddress(chef.getAddress());
				c.setPhone(chef.getPhone());
				c.setEmail(chef.getEmail());
				c.setRole("Chef");
				session.setAttribute("currentUser", c);
				return chefRepository.save(c);
			}
		}
		
		@PostMapping("/api/manager/signup")
		public Manager createManager(@RequestBody Manager manager,HttpSession session) {
			System.out.println(manager.getUsername());
			List<Person> person = (List<Person>) personRepository.findUserByUserName(manager.getUsername());
			if(person.size()>0)
				return null;
			else {
				
				Manager c = new Manager();
				c.setUsername(manager.getUsername());
				c.setFirstName(manager.getFirstName());
				c.setPassword(manager.getPassword());
				c.setLastName(manager.getLastName());
				c.setAddress(manager.getAddress());
				c.setPhone(manager.getPhone());
				c.setEmail(manager.getEmail());
				c.setRole("Manager");
				session.setAttribute("currentUser", c);
				return managerRepository.save(c);
			}
		}
		
		@PostMapping("/api/owner/signup")
		public Owner createOwner(@RequestBody Owner owner,HttpSession session) {
			List<Person> person = (List<Person>) personRepository.findUserByUserName(owner.getUsername());
			if(person.size()>0)
				return null;
			else {
				
				Owner c = new Owner();
				c.setUsername(owner.getUsername());
				c.setFirstName(owner.getFirstName());
				c.setPassword(owner.getPassword());
				c.setLastName(owner.getLastName());
				c.setAddress(owner.getAddress());
				c.setPhone(owner.getPhone());
				c.setEmail(owner.getEmail());
				c.setRole("Owner");
				session.setAttribute("currentUser", c);
				return ownerRepository.save(c);
			}
		}
		
		@GetMapping("/api/profile")
		public Person profile(HttpSession session) {
			Person p =  (Person) session.getAttribute("currentUser");	
			if(p==null) {
				Person falseUser =new Person();
				falseUser.setUsername("CANNOT FIND");
				return falseUser;
			}
			List<Person> person = (List<Person>) personRepository.findUserByUserName(p.getUsername());
			return person.get(0);
		}
		
		@GetMapping("/api/logout")
		public void logoutUser(HttpSession session) {
			session.invalidate();
		}
		
		@PostMapping("/api/login")
		public Person loginUser(@RequestBody Person user,HttpSession session) {
			List<Person> users=(List<Person>) personRepository.findByCredentials(user.getUsername(), user.getPassword());
			if(users.isEmpty())
			{
				Person falseUser =new Person();
				falseUser.setUsername("CANNOT FIND");
				return falseUser;
			}
			else {
				session.setAttribute("currentUser", user);
				return users.get(0);
			}
		}
		
		@GetMapping("/api/customer/search/q={query}")
		public List<Customer> getCustomerByUsernameOrFirstName(@PathVariable("query") String query){
			 return customerRepository.getCustomerByUsernameOrFirstName(query);
		}
		
		@GetMapping("/api/chef/search/q={query}")
		public List<Chef> getChefByUsernameOrFirstName(@PathVariable("query") String query){
			 return chefRepository.getChefByUsernameOrFirstName(query);
		}
		
		@GetMapping("/api/user/{userId}")
		public Person findUserById(@PathVariable("userId") int id) {
			Optional<Person> data = personRepository.findById(id);
			if(data.isPresent()) {
				return data.get();
			}
			else {
				return null;
			}
		}
		
		@PutMapping("/api/user/update")
		public Person updatePerson(@RequestBody Person p,HttpSession session) {
			List<Person> users=(List<Person>) personRepository.findUserByUserName(p.getUsername());
			if(users.size()>0) {
				Person user=users.get(0);
				user.setFirstName(p.getFirstName());
				user.setLastName(p.getLastName());
				user.setPhone(p.getPhone());
				user.setPassword(p.getPassword());
				personRepository.save(user);
				session.setAttribute("currentUser", user);
				return user;
			}
			return null;
		}
		
		@GetMapping("/api/customers")
		public List<Customer> getAllCustomers(){
			return (List<Customer>) customerRepository.findAll();
		}
		
		@GetMapping("/api/owners")
		public List<Owner> getAllOwners(){
			return (List<Owner>) ownerRepository.findAll();
		}
		
		@DeleteMapping("/api/user/delete/{id}")
		public int deleteUser(@PathVariable("id") int id) {
			//System.out.println(id);
			personRepository.deleteById(id);
			return 1;
		}
		
	
}
