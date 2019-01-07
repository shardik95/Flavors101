import React from 'react';
import YelpService from "../Services/YelpService";
import {Link} from "react-router-dom";
import PersonService from "../Services/PersonService";
import ParticlesBg from "./Particles";

class Restaurant extends React.Component{

    constructor(props){
        super(props)
        this.state={
            restaurantId:'',
            restaurant:'',
            user:'',
            session:''
        }
        this.yelpService=YelpService.instance;
        this.personService=PersonService.instance
    }

    componentDidMount(){
        let id=this.props.match.params.restaurantId;
        this.setState({restaurantId:this.props.match.params.restaurantId});
        this.yelpService.getRestaurant(this.props.match.params.restaurantId)
            .then(restaurant=>this.setState({restaurant:restaurant}))

        this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response,session:true})
                }
                else if(response.username==='CANNOT FIND'){
                    this.setState({user:'',session:false})
                }
            })

    }

    componentWillReceiveProps(newProps){
        let id=newProps.match.params.restaurantId;
        this.setState({restaurantId:newProps.match.params.restaurantId})
        this.yelpService.getRestaurant(newProps.match.params.restaurantId)
            .then(restaurant=>this.setState({restaurant:restaurant}))

        this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response,session:true})
                }
                else if(response.username==='CANNOT FIND'){
                    this.setState({user:'',session:false})
                }
            })
    }

    logout(){
        this.personService.logout();
        this.setState({user:'',session:false})
        this.props.history.push("/")
    }

    render(){
        return(<div>
                {this.state.session===true && <button type="button" className="btn btn-outline-dark" onClick={()=>this.logout()}>Logout</button>}

                <nav className="navbar fixed-top navbar-light" style={{background:"#363636"}}>
                    <button className="navbar-brand btn" onClick={()=>this.props.history.push("/")} style={{color:"#fff",background:"#363636"}}>
                        Flavors101</button>
                    <form className="form-inline">

                        <div hidden={this.state.session}>
                            <Link to="/login"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Login</button></Link>

                            <Link to="/register"><button className="btn btn-outline-light" style={{marginRight:"10px"}} type="button">SignUp</button></Link>
                        </div>
                        <h3 style={{color:"#fff",marginRight:"10px"}} hidden={!this.state.session}>Hi, {this.state.user.firstName}</h3>
                        <div hidden={!this.state.session}>
                            <Link to="/profile"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Profile</button></Link>
                            <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                        </div>
                    </form>
                </nav>
                <br/><br/><br/>
                <div style={{textAlign:'center'}}>
                    <h3>{this.state.restaurant.name}</h3>
                    <img src={this.state.restaurant.image_url} alt="food" width="30%"/>
                    <br/><br/><br/>

                    <table className="table-bordered col-centered" style={{width:"40%"}}>
                        <tbody>
                        <tr>
                            <td><b>hours:</b></td>
                            <td>{this.state.restaurant!==''&& (this.state.restaurant.hours[0].open[0].start)} -
                                 {this.state.restaurant!==''&& (this.state.restaurant.hours[0].open[0].end)}
                            </td>
                        </tr>
                        <tr>
                            <td><b>Phone:</b></td>
                            <td>{this.state.restaurant!==''&& (this.state.restaurant.display_phone)}</td>
                        </tr>
                        <tr>
                            <td><b>Address:</b></td>
                            <td>{this.state.restaurant!==''&& (this.state.restaurant.location.display_address[0]+" ")}
                                {this.state.restaurant!==''&& ( this.state.restaurant.location.display_address[1])}</td>
                        </tr>
                        <tr>
                            <td><b>Price:</b></td>
                            <td>{this.state.restaurant!==''&& (this.state.restaurant.price+" ")}
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default Restaurant