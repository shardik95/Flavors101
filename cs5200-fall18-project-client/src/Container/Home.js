import React from 'react';
import {Link} from "react-router-dom";
import PersonService from "../Services/PersonService";
import YelpService from "../Services/YelpService";
import RestaurantService from "../Services/RestaurantService";
import YummlyRecipe from "./YummlyRecipe";
import RestaurantPage from "./RestaurantPage";
import Route from "react-router-dom/es/Route";
import ParticlesBg from "./Particles";

class Home extends React.Component{

    constructor(props){
        super(props)
        this.state={
            user:'',
            session:'',
            query:'',
            search:'',
            userSearch:'',
            customers:'',
            chefs:'',
            restaurants:[]
        }
        this.personService=PersonService.instance
        this.yelpService = YelpService.instance
        this.restaurantService=RestaurantService.instance
        this.logout=this.logout.bind(this)
        this.searchAll=this.searchAll.bind(this);
        this.searchUsers=this.searchUsers.bind(this);
        this.reserve=this.reserve.bind(this)
        this.reserveRest=this.reserveRest.bind(this)
    }

    componentDidMount(){
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
        this.personService.logout().then(()=>this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response,session:true})
                }
                else if(response.username==='CANNOT FIND'){
                    this.setState({user:'',session:false})
                }
            }))
        this.setState({user:'',session:false})
        this.props.history.push("/")
    }

    searchAll(){
        this.yelpService.getYelpRestaurants(this.state.query,"Boston,MA")
            .then(data=>this.setState({search:data}))
    }

    searchUsers(){
       this.personService.searchCustomer(this.state.userSearch)
           .then(customers=>this.setState({customers:customers}))
           .then(()=>console.log(this.state.customers))

        this.personService.searchChef(this.state.userSearch)
            .then(chefs=>this.setState({chefs:chefs}))
            .then(()=>console.log(this.state.chefs))

    }

    reserve(){
        this.restaurantService.getAllRestaurants()
            .then(restaurants=>this.setState({restaurants:restaurants}))
    }

    reserveRest(restId){

        this.restaurantService.reserve(restId,this.state.user.id)
            .then(user=>this.setState({user:user}))
    }

    render(){
        let searchElement;
        let searchElement1;

        let x=false;
        return (<div>

            {this.state.session===true && <button type="button" className="btn btn-outline-dark" onClick={()=>this.logout()}>Logout</button>}
            <nav className="navbar fixed-top navbar-light" style={{background:"#363636"}}>
                <button className="navbar-brand btn" onClick={()=>this.props.history.push("/")} style={{color:"#fff",background:"#363636"}}>
                    Flavors101</button>
                <form className="form-inline">

                    {this.state.session===true && this.state.user.role==='Customer' &&<div>
                        <input className="form-control mr-sm-2" type="search" style={{marginRight:"20px"}} placeholder="Search Users"
                               ref={node=>searchElement1=node} onChange={()=>{
                            return this.setState({userSearch:searchElement1.value})
                        }}/>
                        <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.searchUsers()} type="button">User Search</button>
                    </div>
                    }


                    <div>
                        <input className="form-control mr-sm-2" type="search" style={{marginRight:"20px"}} placeholder="Search Restaurants"
                               ref={node=>searchElement=node} onChange={()=>{
                            return this.setState({query:searchElement.value})
                        }}/>
                    </div>

                    <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.searchAll()} type="button">Search</button>

                    <div hidden={this.state.session}>
                        <Link to="/login"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Login</button></Link>

                        <Link to="/register"><button className="btn btn-outline-light" style={{marginRight:"10px"}} type="button">SignUp</button></Link>
                    </div>
                    <h3 style={{color:"#fff",marginRight:"10px"}} hidden={!this.state.session}>Hi, {this.state.user.firstName}</h3>

                    <div hidden={!this.state.session}>
                        {this.state.user.role!=='Admin' && <Link to="/profile"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Profile</button></Link>}
                        <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                    </div>

                    <div hidden={!this.state.session}>
                        {this.state.user.role ==='Admin' &&
                        <Link to="/admin"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Admin Page</button></Link>}
                    </div>
                </form>
            </nav>

            <br/><br/>

            <div className="row container-fluid">
                <div className="col-3">
                {this.state.search!=='' && <div>
                    <ul className="list-group">
                        {this.state.search.Yelp.map((result,index)=>(

                            <li className="list-group-item" key={index}>
                                <Link to={`/restaurant/${result.id}`}>{result.name}</Link>
                            </li>
                            ))}
                    </ul>
                </div>}
                </div>
                <div className="col-3">
                    {this.state.customers!=='' && this.state.chefs!==''&&<div>
                        <ul className="list-group">
                            <li className="list-group-item">Users</li>
                            {this.state.customers.map((result,index)=>(
                                <li className="list-group-item" key={index}>
                                    <Link to={`/user/profile/${result.id}`}>{result.firstName}</Link>
                                </li>
                            ))}
                        </ul>
                        <ul className="list-group">
                            <li className="list-group-item">Chefs</li>
                            {this.state.chefs.map((result,index)=>(
                                <li className="list-group-item" key={index}>
                                    <Link to={`/user/profile/${result.id}`}>{result.firstName}</Link>
                                </li>
                            ))}
                        </ul>

                    </div>}
                </div>

                <div className="centered" style={{marginTop:'20%', marginLeft: '30%', background:'#fff', opacity:1}}>
                    <div style={{textAlign:'center', marginTop:'10%'}}>
                        <h1 style={{color:'#000000'}}>Welcome to Flavors101</h1>
                <div className="col-3 col-centered">
                    {this.state.session===true && this.state.user.role==='Customer'&&
                    <button className="btn btn-outline-dark" style={{marginRight:"5px"}} onClick={()=>this.reserve()} type="button">Create Reservation</button>}
                    <br/>
                    <br/>
                    <div>
                        <ul className="list-group " style={{width:"200px"}}>
                            {this.state.restaurants!==undefined && this.state.restaurants.length>0 && this.state.restaurants.map((result,index)=> {
                                x=false
                                return <li className="list-group-item" key={index} >
                                    <Link to={`/page/restaurant/${result.id}`}>{result.name}</Link>
                                    {this.state.user.reservedRestaurants.length>0 && this.state.user.reservedRestaurants.map((rest, index) => {
                                        if (result.id === rest.id) {
                                            x = true
                                        }
                                    })}
                                    {x === false && <button className="btn btn-outline-dark float-right"
                                                            style={{marginRight: "5px",marginLeft:"5px"}}
                                                            onClick={() => this.reserveRest(result.id)}
                                                            type="button">Reserve</button>}
                                    {x === true && <button className="btn btn-outline-dark float-right"
                                                           style={{marginRight: "5px",marginLeft:"15px"}}
                                                           onClick={() => this.reserveRest(result.id)}
                                                           type="button">Reserved</button>}
                                </li>
                            })}

                        </ul>

                    </div>
                </div>

                        {this.state.session !== true && <p><i><b>Register to unlock all the features, if not, have fun playing with the particles!</b></i></p>}
                        {this.state.session === true && this.state.user.role === 'Chef' && <h5 style={{color:'#000000'}}><i><b>{this.state.user.firstName}</b></i></h5>}
                        {this.state.session === true && this.state.user.role === 'Manager' && <h5 style={{color:'#000000'}}><i><b>{this.state.user.firstName}</b></i></h5>}
                        {this.state.session === true && this.state.user.role === 'Owner' && <h5 style={{color:'#000000'}}><i><b>{this.state.user.firstName}</b></i></h5>}
                    </div>
                </div>

            </div>
            <br/>



        <ParticlesBg/>
        </div>)
    }
}

export default Home;