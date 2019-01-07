package edu.northeastern.cs5200.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Customer extends Person{

	private String preferredCuisine;
	private Boolean vegan;
	
	@OneToMany(mappedBy="person",cascade=CascadeType.REMOVE,orphanRemoval=true)
	private List<Follower> followers = new ArrayList<>();
	
	@OneToMany(mappedBy="person",cascade=CascadeType.REMOVE,orphanRemoval=true)
	private List<Following> following = new ArrayList<>();
	
	@OneToMany(mappedBy="customer",cascade=CascadeType.REMOVE,orphanRemoval=true)
	private List<Review> reviews = new ArrayList<>();
	
	@ManyToMany(mappedBy="reservedCustomers")
	  private List<Restaurant> reservedRestaurants;
	
	@ManyToMany(mappedBy="attendingCustomers")
	  private List<Event> attendingEvents;
	

	public List<Event> getAttendingEvents() {
		return attendingEvents;
	}
	public void setAttendingEvents(List<Event> attendingEvents) {
		this.attendingEvents = attendingEvents;
	}
	public List<Review> getReviews() {
		return reviews;
	}
	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}
	public List<Restaurant> getReservedRestaurants() {
		return reservedRestaurants;
	}
	public void setReservedRestaurants(List<Restaurant> reservedRestaurants) {
		this.reservedRestaurants = reservedRestaurants;
	}
	public String getPreferredCuisine() {
		return preferredCuisine;
	}
	public void setPreferredCuisine(String preferredCuisine) {
		this.preferredCuisine = preferredCuisine;
	}
	public Boolean getVegan() {
		return vegan;
	}
	public void setVegan(Boolean vegan) {
		this.vegan = vegan;
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
	
	public void createReservation(Restaurant restaurant) {
		   this.getReservedRestaurants().add(restaurant);
		   if(!restaurant.getReservedCustomers().contains(this))
			   restaurant.getReservedCustomers().add(this);
		}
	
	public void attendEvent(Event event) {
		   this.getAttendingEvents().add(event);
		   if(!event.getAttendingCustomers().contains(this))
			   event.getAttendingCustomers().add(this);
		}
	
	public void cancelEvent(Event event) {
			this.getAttendingEvents().remove(event);
			if(event.getAttendingCustomers().contains(this))
				   event.getAttendingCustomers().remove(this);
		
//		   List<Event> e = this.getAttendingEvents();
//		   List<Event> newe = new ArrayList<>();
//			for(Event e1:e) {
//				if(e1.getId()!=event.getId())
//					newe.add(e1);
//			}
//		   this.setAttendingEvents(newe);
//		   if(event.getAttendingCustomers().contains(this)) {
//			   List<Customer> c = event.getAttendingCustomers();
//			   List<Customer> newc = new ArrayList<>();
//				for(Customer e1:c) {
//					if(e1.getId()!=event.getId())
//						newc.add(e1);
//				}
//			   event.setAttendingCustomers(newc);
//		   }
			   
		}
	
	public void cancelReservation(Restaurant r) {
		this.getReservedRestaurants().remove(r);
		if(r.getReservedCustomers().contains(this))
			   r.getReservedCustomers().remove(this);
	}

	
	
}
