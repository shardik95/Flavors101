package edu.northeastern.cs5200.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Restaurant {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	private String location;
	private String cuisine;
	private String phone;
	private String url;
	
	@ManyToOne
	@JsonIgnore
	private Owner owner;
	
	@OneToMany(mappedBy="restaurant")
	private List<Manager> managers = new ArrayList<>();
	
	@OneToMany(mappedBy="restaurant")
	private List<Chef> chefs = new ArrayList<>();
	
	@OneToMany(mappedBy="restaurant",cascade=CascadeType.REMOVE,orphanRemoval=true)
	private List<Review> reviews = new ArrayList<>();
	
	@ManyToMany
	@JsonIgnore
	@JoinTable(name="Reservation",joinColumns=@JoinColumn(name="Customer_id",referencedColumnName="id"),
	     inverseJoinColumns=@JoinColumn(name="Restaurant_id", referencedColumnName="id"))
	private List<Customer> reservedCustomers;
	
	@OneToMany(mappedBy="restaurant")
	private List<Event> events = new ArrayList<>();
	
	
	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}

	public List<Review> getReviews() {
		return reviews;
	}

	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}

	public List<Customer> getReservedCustomers() {
		return reservedCustomers;
	}

	public void setReservedCustomers(List<Customer> reservedCustomers) {
		this.reservedCustomers = reservedCustomers;
	}

	public List<Chef> getChefs() {
		return chefs;
	}

	public void setChefs(List<Chef> chefs) {
		this.chefs = chefs;
	}

	public List<Manager> getManagers() {
		return managers;
	}

	public void setManagers(List<Manager> managers) {
		this.managers = managers;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getCuisine() {
		return cuisine;
	}

	public void setCuisine(String cuisine) {
		this.cuisine = cuisine;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Owner getOwner() {
		return owner;
	}

	public void setOwner(Owner owner) {
		this.owner = owner;
	}
	
	
	
	
}
