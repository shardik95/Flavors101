package edu.northeastern.cs5200.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Event {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String eventName;
	private String noOfPeople;
	private String time;
	
	@ManyToOne
	@JsonIgnore
	private Manager manager;
	
	@ManyToMany
	@JsonIgnore
	@JoinTable(name="Customer_Events",joinColumns=@JoinColumn(name="Event_id",referencedColumnName="id"),
	     inverseJoinColumns=@JoinColumn(name="Customer_id", referencedColumnName="id"))
	private List<Customer> attendingCustomers;
	
	@ManyToOne
	@JsonIgnore
	private Restaurant restaurant;
	
	
	
	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public List<Customer> getAttendingCustomers() {
		return attendingCustomers;
	}

	public void setAttendingCustomers(List<Customer> attendingCustomers) {
		this.attendingCustomers = attendingCustomers;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getNoOfPeople() {
		return noOfPeople;
	}

	public void setNoOfPeople(String noOfPeople) {
		this.noOfPeople = noOfPeople;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Manager getManager() {
		return manager;
	}

	public void setManager(Manager manager) {
		this.manager = manager;
	}
	
	
}
