import React from 'react';
import OwnerService from "../Services/OwnerService";
import Link from "react-router-dom/es/Link";
import RestaurantService from "../Services/RestaurantService";

class OwnerRestaurant extends React.Component{

    constructor(props){
        super(props)
        this.state={
            name:'',
            location:'',
            cuisine:'',
            phone:'',
            url:'',
            create:false,
            myRestaurants:[],
            userId:'',
            resttaurantU:'',update:false,
            nameU:'',
            locationU:'',
            cuisineU:'',
            phoneU:'',
            urlU:'',
        }
        this.createRestaurant=this.createRestaurant.bind(this)
        this.deleteRestaurant=this.deleteRestaurant.bind(this);
        this.updateRestaurant=this.updateRestaurant.bind(this);
        this.ownerService=OwnerService.instance
        this.restaurantService=RestaurantService.instance;

    }

    componentDidMount(){
        let userId=this.props.match.params.userId;

        this.setState({userId:userId});

        this.ownerService.getAllRestaurants(this.props.match.params.userId)
            .then(res=>this.setState({myRestaurants:res}))
    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId;

        this.setState({userId:userId});

        this.ownerService.getAllRestaurants(newProps.match.params.userId)
            .then(res=>this.setState({myRestaurants:res}))
    }

    deleteRestaurant(id){
        this.restaurantService.deleteRestaurant(id)
            .then(()=>this.ownerService.getAllRestaurants(this.state.userId)
                .then(res=>this.setState({myRestaurants:res})))
    }

    createRestaurant(){

        let restaurant={
            name:this.state.name,
            location:this.state.location,
            cuisine:this.state.cuisine,
            url:this.state.url,
            phone:this.state.phone
        };

       this.ownerService.createRestaurant(restaurant,this.state.userId)
           .then(()=>this.ownerService.getAllRestaurants(this.state.userId)
               .then(res=>this.setState({myRestaurants:res})))


    }

    updateRestaurant(){
        let restaurant={
            name:this.state.nameU,
            location:this.state.locationU,
            cuisine:this.state.cuisineU,
            url:this.state.urlU,
            phone:this.state.phoneU,
            id:this.state.resttaurantU.id
        };

        this.ownerService.updateRestaurant(restaurant)
            .then(()=>this.ownerService.getAllRestaurants(this.state.userId)
                .then(res=>this.setState({myRestaurants:res})))

    }


    render(){
        return(
            <div>
                <br/>
                <div className="row container-fluid">
                    <div className="col-3">
                        <button className="btn btn-outline-dark" style={{marginRight:"5px"}} onClick={()=>this.setState({create:true})} type="button">Create Restaurant</button>
                        <br/><br/>
                        {this.state.create===true && <form>
                            <div>
                                <label>Name</label>
                                <input type="text" className='form-control' placeholder='Enter Name'  onChange={(event)=>this.setState({name:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>Location</label>
                                <input type="text" className='form-control' placeholder='Enter Location' onChange={(event)=>this.setState({location:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>Cuisine</label>
                                <input type="text" className='form-control' placeholder='Cuisine' onChange={(event)=>this.setState({cuisine:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>Phone</label>
                                <input type="text" className='form-control' placeholder='Phone' onChange={(event)=>this.setState({phone:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>Url</label>
                                <input type="text" className='form-control' placeholder='Url' onChange={(event)=>this.setState({url:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <button type="button" className="btn btn-outline-dark" onClick={()=>this.createRestaurant()}>Submit</button>
                            </div>

                        </form>}

                    </div>


                    <div className="col-6">
                        <h4>My Restaurants</h4>
                        <br/>
                        {this.state.myRestaurants.length===0 && <h5>No Restaurants Owned</h5>}
                        <ul className="list-group">
                        {this.state.myRestaurants.length>0 && this.state.myRestaurants.map((restaurant,index)=>(
                            <li className="list-group-item" key={index}>
                                <Link to={`/page/restaurant/${restaurant.id}`}>{restaurant.name}</Link>


                                <button className="btn btn-outline-dark float-right"
                                        style={{marginRight: "5px"}}
                                        onClick={() => this.setState({resttaurantU:restaurant,update:true})}
                                        type="button">Update Restaurant
                                </button>

                                <button className="btn btn-outline-dark float-right"
                                        style={{marginRight: "5px"}}
                                        onClick={() => this.deleteRestaurant(restaurant.id)}
                                        type="button">Delete Restaurant
                                </button>
                            </li>
                        ))}
                        </ul>
                    </div>

                    <div className="col-3">
                        <br/>
                        {this.state.update===true && <form>
                            <div>
                                <label>Name</label>
                                <input type="text" className='form-control' placeholder='Enter Name'  defaultValue={this.state.resttaurantU.name}
                                       onChange={(event)=>this.setState({nameU:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>Location</label>
                                <input type="text" className='form-control' placeholder='Enter Location' defaultValue={this.state.resttaurantU.location}
                                       onChange={(event)=>this.setState({locationU:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>Cuisine</label>
                                <input type="text" className='form-control' placeholder='Cuisine' defaultValue={this.state.resttaurantU.cuisine}
                                       onChange={(event)=>this.setState({cuisineU:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>Phone</label>
                                <input type="text" className='form-control' placeholder='Phone' defaultValue={this.state.resttaurantU.phone}
                                       onChange={(event)=>this.setState({phoneU:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>Url</label>
                                <input type="text" className='form-control' placeholder='Url' defaultValue={this.state.resttaurantU.url}
                                       onChange={(event)=>this.setState({urlU:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <button type="button" className="btn btn-outline-dark" onClick={()=>this.updateRestaurant()}>Update</button>
                            </div>

                        </form>}

                    </div>

                </div>

            </div>
        )
    }

}

export default OwnerRestaurant;