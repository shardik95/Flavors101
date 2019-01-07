package edu.northeastern.cs5200.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
public class Owner extends Person{
	
	@OneToMany(mappedBy="owner",cascade=CascadeType.REMOVE,orphanRemoval=true)
	private List<Restaurant> restaurants = new ArrayList<>();
	
	@OneToMany(mappedBy="owner")
	private List<Manager> managers = new ArrayList<>();
	
	@OneToMany(mappedBy="owner")
	private List<Chef> chefs = new ArrayList<>();

	public List<Restaurant> getRestaurants() {
		return restaurants;
	}

	public void setRestaurants(List<Restaurant> restaurants) {
		this.restaurants = restaurants;
	}

	public List<Manager> getManagers() {
		return managers;
	}

	public void setManagers(List<Manager> managers) {
		this.managers = managers;
	}

	public List<Chef> getChefs() {
		return chefs;
	}

	public void setChefs(List<Chef> chefs) {
		this.chefs = chefs;
	}
	
	
	

}
