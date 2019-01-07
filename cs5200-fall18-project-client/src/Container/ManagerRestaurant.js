import React from "react";
import ManagerService from "../Services/ManagerService";
import RestaurantService from "../Services/RestaurantService";
import ReviewService from "../Services/ReviewService";

class ManagerRestaurant extends React.Component {

    constructor(props){
        super(props);
        this.state={
            userId:'',
            restaurant:'',
            reservations:[],
            reviews:[],
            manager:''
        }
        this.managerService=ManagerService.instance;
        this.restaurantService=RestaurantService.instance;
        this.reviewService=ReviewService.instance;
    }

    componentDidMount(){
        let userId=this.props.match.params.userId;

        this.setState({userId:userId});

        this.managerService.getManager(this.props.match.params.userId)
            .then(manager=>this.setState({manager:manager}))
            .then(()=>this.state.manager.hired===true && this.managerService.getManagerById(this.props.match.params.userId)
                .then(manager=>this.setState({restaurant:manager}))
                .then(()=>this.restaurantService.getReservations(this.state.restaurant.id)
                    .then(reservations=>this.setState({reservations:reservations})))
                .then(()=>this.reviewService.getReviewsOfRestaurant(this.state.restaurant.id))
                .then(reviews=>this.setState({reviews:reviews})))

    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId;

        this.setState({userId:userId});

        this.managerService.getManager(newProps.match.params.userId)
            .then(manager=>this.setState({manager:manager}))
            .then(()=>this.state.manager.hired===true && this.managerService.getManagerById(this.props.match.params.userId)
                .then(manager=>this.setState({restaurant:manager}))
                .then(()=>this.restaurantService.getReservations(this.state.restaurant.id)
                    .then(reservations=>this.setState({reservations:reservations})))
                .then(()=>this.reviewService.getReviewsOfRestaurant(this.state.restaurant.id))
                .then(reviews=>this.setState({reviews:reviews})))
    }

    cancelReservation(id){
        this.restaurantService.cancelReservation(this.state.restaurant.id,id)
            .then(()=>this.managerService.getManagerById(this.props.match.params.userId)
                .then(manager=>this.setState({restaurant:manager}))
                .then(()=>this.restaurantService.getReservations(this.state.restaurant.id)
                    .then(reservations=>this.setState({reservations:reservations})))
                .then(()=>this.reviewService.getReviewsOfRestaurant(this.state.restaurant.id))
                .then(reviews=>this.setState({reviews:reviews})))
    }

    render(){
        return(
            <div>
                <br/>
                {this.state.restaurant!=='' &&<div>
                <table className="table-bordered col-centered" style={{width:"40%"}}>
                    <tbody>
                    <tr>
                    <td><b>Name:</b></td>
                    <td>{this.state.restaurant.name}
                    </td>
                    </tr>
                    <tr>
                    <td><b>Cuisine:</b></td>
                    <td>{this.state.restaurant.cuisine}</td>
                    </tr>
                    <tr>
                    <td><b>Phone:</b></td>
                    <td>{this.state.restaurant.phone}</td>
                    </tr>
                    <tr>
                    <td><b>Location:</b></td>
                    <td>{this.state.restaurant.location}
                    </td>
                    </tr>
                    </tbody>
                    </table>


                    <br/><br/>


                    <ul className="list-group">
                        {this.state.reservations.length===0 && <li className="list-group-item">No Reservations</li>}
                        {this.state.reservations.length>0 && <li className="list-group-item"><b>Reservations</b></li>}
                        {this.state.reservations.length>0 && this.state.reservations.map((result,index)=>(
                            <li className="list-group-item" key={index}>
                                {result.firstName}
                                <button className="btn btn-outline-dark float-right"
                                        style={{marginRight:"5px"}} onClick={()=>this.cancelReservation(result.id)} type="button">Cancel</button>
                            </li>
                        ))}
                    </ul>

                    <br/><br/>

                    <ul className="list-group">
                        {this.state.reviews.length===0 && <li className="list-group-item">No Reviews</li>}
                        {this.state.reviews.length>0 && <li className="list-group-item"><b>Reviews</b></li>}
                        {this.state.reviews.length>0 && this.state.reviews.map((result,index)=>(
                            <li className="list-group-item" key={index}>
                                {result.review}
                            </li>
                        ))}
                    </ul>
                    </div>}
                <br/>
                {this.state.restaurant==='' && <h3>You are not hired yet</h3>}

            </div>
        )
    }

}

export default ManagerRestaurant;