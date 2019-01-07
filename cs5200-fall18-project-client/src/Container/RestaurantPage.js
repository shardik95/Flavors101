import React from "react";
import RestaurantService from "../Services/RestaurantService";
import PersonService from "../Services/PersonService";
import Link from "react-router-dom/es/Link";

class RestaurantPage extends React.Component{

    constructor(props){
        super(props)
        this.state={
            restId:'',
            restaurant:'',
            user:'',
            session:'',
        }
        this.restaurantService=RestaurantService.instance;
        this.personService=PersonService.instance
        this.logout=this.logout.bind(this)

    }

    componentDidMount() {
        let restId = this.props.match.params.restId;
        this.setState({restId: restId});
        this.restaurantService.getRestaurantById(this.props.match.params.restId)
            .then(restaurant=>this.setState({restaurant:restaurant}))
            .then(()=>console.log(this.state.restaurant))

        this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response,session:true})
                }
            })

    }

    componentWillReceiveProps(newProps){
        let restId = newProps.match.params.restId;

        this.setState({restId: restId});
        this.restaurantService.getRestaurantById(newProps.match.params.restId)
            .then(restaurant=>this.setState({restaurant:restaurant}))

        this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response,session:true})
                }
            })
    }

    logout(){
        this.personService.logout();
        this.setState({user:'',session:false})
        this.props.history.push("/")
    }

    render(){
        return(
            <div>
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
                            <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                        </div>
                    </form>
                </nav>
                <br/>

                <div style={{textAlign:'center',marginRight:'20%',marginLeft:"20%"}}>
                    <br/><br/><br/>
                    <h3>{this.state.restaurant.name}</h3>
                    <br/>
                    <table className="table-bordered col-centered" style={{width:"50%"}}>
                        <tbody>
                        <tr>
                            <td><b>Cuisine:</b></td>
                            <td>{this.state.restaurant!==''&& (this.state.restaurant.cuisine)}
                            </td>
                        </tr>
                        <tr>
                            <td><b>Phone:</b></td>
                            <td>{this.state.restaurant!==''&& (this.state.restaurant.phone)}</td>
                        </tr>
                        <tr>
                            <td><b>Address:</b></td>
                            <td>{this.state.restaurant!==''&& (this.state.restaurant.location)}</td>
                        </tr>
                        <tr>
                            <td><b>Url:</b></td>
                            <td>{this.state.restaurant!==''&& (this.state.restaurant.url)}</td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <div className="row container-fluid">
                        <div className="col-4">
                            <li className="list-group-item bg-dark" style={{color:'white'}}>Managers</li>
                            {this.state.restaurant.managers!==undefined &&
                            this.state.restaurant.managers.length===0 && <h5>No Managers Hired</h5>}
                            <ul className="list-group">
                                {this.state.restaurant!==undefined && this.state.restaurant!==''
                                    && this.state.restaurant.managers.length>0 && this.state.restaurant.managers.map((managers,index)=>(
                                    <li className="list-group-item" key={index}>
                                        {managers.firstName}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-4">
                            <li className="list-group-item bg-dark" style={{color:'white'}}>Chefs</li>
                            {this.state.restaurant.chefs!==undefined &&
                            this.state.restaurant.chefs.length===0 && <h5>No Chefs Hired</h5>}
                            <ul className="list-group">
                                {this.state.restaurant!==undefined && this.state.restaurant!==''
                                && this.state.restaurant.chefs.length>0 && this.state.restaurant.chefs.map((chefs,index)=>(
                                    <li className="list-group-item" key={index}>
                                        {chefs.firstName}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-4">
                            <li className="list-group-item bg-dark" style={{color:'white'}}>Events</li>
                            {this.state.restaurant.events!==undefined &&
                            this.state.restaurant.events.length===0 && <h5>No Events</h5>}
                            <ul className="list-group">
                                {this.state.restaurant!==undefined && this.state.restaurant!==''
                                && this.state.restaurant.events.length>0 && this.state.restaurant.events.map((events,index)=>(
                                    <li className="list-group-item" key={index}>
                                        {events.eventName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default RestaurantPage;