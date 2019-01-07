import React from "react";
import PersonService from "../Services/PersonService";
import RestaurantService from "../Services/RestaurantService";
import ReviewService from "../Services/ReviewService";

class CustomerReview extends React.Component{

    constructor(props){
        super(props)
        this.state={
            create:false,
            review:'',
            location:'',
            myReviews:[],
            user:'',
            userId:'',
            restaurants:[],
            update:false,
            selectedReview:'',
            newReview:'',
            newLocation:'',
            newId:''

        }
        this.createReview=this.createReview.bind(this);
        this.personService=PersonService.instance
        this.restaurantService=RestaurantService.instance;
        this.reviewService=ReviewService.instance;
        this.deleteReview=this.deleteReview.bind(this);
    }

    componentDidMount(){
        let userId=this.props.match.params.userId;

        this.setState({userId:userId});

        this.personService.findUserById(this.props.match.params.userId)
            .then(user=>this.setState({user:user}))
            .then(()=>this.reviewService.getReviewsOfUser(this.state.userId))
            .then(reviews=>this.setState({myReviews:reviews}))

        this.restaurantService.getAllRestaurants()
            .then(restaurants=>this.setState({restaurants:restaurants}))
    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId;

        this.setState({userId:userId});

        this.personService.findUserById(newProps.match.params.userId)
            .then(user=>this.setState({user:user}))
            .then(()=>this.reviewService.getReviewsOfUser(this.state.userId))
            .then(reviews=>this.setState({myReviews:reviews}))

        this.restaurantService.getAllRestaurants()
            .then(restaurants=>this.setState({restaurants:restaurants}))
    }

    createReview(){

        let review={
            review:this.state.review,
        }

        this.reviewService.createReview(review,this.state.userId,this.state.location)
            .then(()=>this.reviewService.getReviewsOfUser(this.state.userId))
            .then(reviews=>this.setState({myReviews:reviews}))
    }

    deleteReview(id){
        this.reviewService.deleteReview(id)
            .then(()=>this.reviewService.getReviewsOfUser(this.state.userId))
            .then(reviews=>this.setState({myReviews:reviews}))
    }

    updateReview(){
        let newReview={
            review:this.state.newReview,
            id:this.state.newId
        }
        this.reviewService.updateReview(newReview,this.state.userId,this.state.newLocation)
            .then(()=>this.reviewService.getReviewsOfUser(this.state.userId))
            .then(reviews=>this.setState({myReviews:reviews}))
    }

    render(){


        return(
           <div>
               <div className="row container-fluid">
                   <div className="col-3">
                       <br/>
                       <button className="btn btn-outline-dark" style={{marginRight:"5px"}} onClick={()=>this.setState({create:true})} type="button">Create Review</button>
                       <br/><br/>
                       {this.state.create===true && <form>
                           <div>
                               <label>Review</label>
                               <input type="text" className='form-control' placeholder='Enter Review'  onChange={(event)=>this.setState({review:event.target.value})}/>
                           </div>
                           <br/>
                           <div>
                               <label>Location</label>
                               <select className="form-control" onChange={(event)=>this.setState({location:event.target.value})}>
                                   {this.state.restaurants.map((restaurant,index)=>(<option>{restaurant.name}</option>))}
                               </select>

                           </div>
                           <br/>
                           <div>
                               <button type="button" className="btn btn-outline-dark" onClick={()=>this.createReview()}>Submit</button>
                           </div>

                       </form>}

                   </div>


                   <div className="col-4">
                       <h4>My Reviews</h4>
                       <br/>
                       {this.state.myReviews.length===0 && <h5>No Reviews given</h5>}
                       <ul className="list-group">
                           {this.state.myReviews.length>0 && this.state.myReviews.map((review,index)=>(
                               <li className="list-group-item" key={index}>
                                   {review.review}

                                   <button className="btn btn-outline-dark float-right"
                                           style={{marginRight:"5px"}} onClick={()=>this.deleteReview(review.id)} type="button">Delete</button>

                                   <button className="btn btn-outline-dark float-right"
                                           style={{marginRight:"5px"}} onClick={()=>this.setState({update:true,selectedReview:review,newId:review.id})} type="button">Update</button>
                               </li>
                           ))}
                       </ul>
                   </div>

                   <div className="col-3">
                       {this.state.update===true && <form>
                           <h3>Update</h3>
                           <div>
                               <label>Review</label>
                               <input type="text"
                                      className='form-control' defaultValue={this.state.selectedReview.review}
                                      placeholder='Enter Review'  onChange={(event)=>{this.setState({newReview:event.target.value})}}/>
                           </div>
                           <br/>
                           <div>
                               <label>Location</label>
                               <select className="form-control" onChange={(event)=>this.setState({newLocation:event.target.value})}>
                                   <option>Select Restaurant</option>
                                   {this.state.restaurants.map((restaurant,index)=>(<option key={index}>{restaurant.name}</option>))}
                               </select>

                           </div>
                           <br/>
                           <div>
                               <button type="button" className="btn btn-outline-dark" onClick={()=>this.updateReview()}>Submit</button>
                           </div>

                       </form>}

                   </div>

               </div>


           </div>
        )
    }

}

export default CustomerReview;
