package edu.northeastern.cs5200.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Chef extends Person{

	private String speciality;
	private boolean isHired;
	
	@OneToMany(mappedBy="person",cascade=CascadeType.REMOVE,orphanRemoval=true)
	private List<Follower> followers = new ArrayList<>();
	
	@OneToMany(mappedBy="person",cascade=CascadeType.REMOVE,orphanRemoval=true)
	private List<Following> following = new ArrayList<>();
	
	@ManyToOne
	@JsonIgnore
	private Owner owner;
	
	@ManyToOne
	@JsonIgnore
	private Restaurant restaurant;
	
	@OneToMany(mappedBy="chef",cascade=CascadeType.REMOVE,orphanRemoval=true)
	private List<Recipe> recipies = new ArrayList<>();
	
	
	public List<Recipe> getRecipies() {
		return recipies;
	}

	public void setRecipies(List<Recipe> recipies) {
		this.recipies = recipies;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
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

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public List<Follower> getFollowers() {
		return followers;
	}

	public void setFollowers(List<Follower> followers) {
		this.followers = followers;
	}

	public List<Following> getFollowing() {
		return following;
	}

	public void setFollowing(List<Following> following) {
		this.following = following;
	}
	
	
}
