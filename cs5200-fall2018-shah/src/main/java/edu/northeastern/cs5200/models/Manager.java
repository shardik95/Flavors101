package edu.northeastern.cs5200.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Manager extends Person{

	private boolean isPermanent;
	private int salary;
	private boolean isHired;
	
	@ManyToOne
	@JsonIgnore
	private Owner owner;
	
	@ManyToOne
	@JsonIgnore
	private Restaurant restaurant;
	
	@OneToMany(mappedBy="manager")
	private List<Event> events = new ArrayList<>();
	
	public List<Event> getEvents() {
		return events;
	}
	public void setEvents(List<Event> events) {
		this.events = events;
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	public boolean isPermanent() {
		return isPermanent;
	}
	public void setPermanent(boolean isPermanent) {
		this.isPermanent = isPermanent;
	}
	public int getSalary() {
		return salary;
	}
	public void setSalary(int salary) {
		this.salary = salary;
	}
	public boolean isHired() {
		return isHired;
	}
	public void setHired(boolean isHired) {
		this.isHired = isHired;
	}
	public Owner getOwner() {
		return owner;
	}
	public void setOwner(Owner owner) {
		this.owner = owner;
	}
	
	
	
}
