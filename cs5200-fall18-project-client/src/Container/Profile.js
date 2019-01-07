import React from 'react';
import {Link} from "react-router-dom";
import PersonService from "../Services/PersonService";
import Follower from "./Follower";
import Following from "./Following";
import Route from "react-router-dom/es/Route";
import OwnerRestaurant from "./OwnerRestaurant";
import OwnerManager from "./OwnerManager";
import OwnerChefs from "./OwnerChefs";
import ManagerRestaurant from "./ManagerRestaurant";
import ChefRestaurant from "./ChefRestaurant";
import CustomerReservation from "./CustomerReservation";
import CustomerReview from "./CustomerReview";
import ManagerEvents from "./ManagerEvents";
import CustomerEvents from "./CustomerEvents";
import SearchRecipe from "./SearchRecipe";
import YummlyRecipe from "./YummlyRecipe";
import UserAccount from "./UserAccount";
import Ingredients from "./Ingredients";
import Recipe from "./Recipe";
class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state={
            user:'',
            session:'',
        }
        this.personService=PersonService.instance
        this.logout=this.logout.bind(this)
    }

    componentDidMount(){

        this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response,session:true})
                }
            })
    }

    componentWillReceiveProps(newProps){
        this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response})
                }
            })
    }

    logout(){
        this.personService.logout();
        this.setState({user:'',session:false})
        this.props.history.push("/")
    }

    render(){
        return (<div>
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
            <div style={{marginTop:"2%"}} className="row container-fluid">
                <div className="col-3" style={divStyle}>
                    <i className="fa fa-5x fa-user-circle" style={{marginTop:'45px',color:'#fff'}}/>
                    <h3>@{this.state.user.username}<br/>
                    </h3>

                    <br/>
                    <div style={{border:"1px solid white"}}>
                        <p>Name: {this.state.user.firstName} {this.state.user.lastName}</p>
                        <p>Email: {this.state.user.email} </p>
                    </div>
                </div>

                <div className="col-9">
                    <ul className="nav nav-tabs" style={navtabstyle}>
                        <li className="nav-item active" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/account`}> Account </Link>
                        </li>
                        {this.state.user.role==='Customer' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/followers`}>Followers</Link>
                        </li>}
                        {this.state.user.role==='Customer' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/following`}>Following</Link>
                        </li>}
                        {this.state.user.role==='Customer' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/reservation`}> Reservations</Link>
                        </li>}
                        {this.state.user.role==='Customer' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/customer/events`}> Events</Link>
                        </li>}
                        {this.state.user.role==='Chef' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`profile/${this.state.user.id}/chef/Recipe`}>My Recipes</Link>
                        </li>}
                        {this.state.user.role==='Chef' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`profile/${this.state.user.id}/searchRecipe`}>Search Recipes</Link>
                        </li>}
                        {this.state.user.role==='Chef' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/ingredients`}>Ingredients</Link>
                        </li>}
                        {this.state.user.role==='Owner' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/owner/restaurants`}>My Restaurants</Link>
                        </li>}
                        {this.state.user.role==='Owner' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/owner/managers`}>My Managers</Link>
                        </li>}
                        {this.state.user.role==='Owner' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/owner/chefs`}>My Chefs</Link>
                        </li>}
                        {this.state.user.role==='Manager' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/manager/events`}>Manage Events</Link>
                        </li>}
                        {this.state.user.role==='Customer' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/customer/review`}>Reviews</Link>
                        </li>}
                        {this.state.user.role==='Manager' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/managers/restaurant`}>My Restaurant</Link>
                        </li>}
                        {this.state.user.role==='Chef' && <li className="nav-item" style={{padding:"15px"}}>
                            <Link to={`/profile/${this.state.user.id}/chef/restaurant`}>My Restaurant</Link>
                        </li>}
                    </ul>
                    <Route path='/profile/:userId/followers'
                           component={Follower} />
                    <Route path="/profile/:userId/following"
                           component={Following}/>
                    <Route path='/profile/:userId/owner/restaurants'
                           component={OwnerRestaurant}/>
                    <Route path='/profile/:userId/owner/managers'
                           component={OwnerManager}/>
                    <Route path='/profile/:userId/owner/chefs'
                           component={OwnerChefs}/>
                    <Route path='/profile/:userId/managers/restaurant'
                           component={ManagerRestaurant}/>
                    <Route path='/profile/:userId/chef/restaurant'
                           component={ChefRestaurant}/>
                    <Route path='/profile/:userId/reservation'
                           component={CustomerReservation}/>
                    <Route path='/profile/:userId/customer/review'
                           component={CustomerReview}/>
                    <Route path='/profile/:userId/manager/events'
                           component={ManagerEvents}/>
                    <Route path='/profile/:userId/customer/events'
                           component={CustomerEvents}/>
                    <Route path='/profile/:userId/account'
                           component={UserAccount}/>
                    <Route path='/profile/:userId/ingredients'
                           component={Ingredients}/>
                    <Route path='/profile/:userId/chef/recipe'
                           component={Recipe}/>

                    <div className="row">
                        <div className="col-5">
                            <Route path='/profile/:userId/searchRecipe'
                                   component={SearchRecipe}/>
                        </div>
                        <div className="col-7">
                            <Route path='/profile/:userId/searchRecipe/:recipeId'
                                   component={YummlyRecipe}/>
                        </div>
                    </div>

                </div>

            </div>

        </div>)
    }
x
}


const divStyle = {
    height:'100vh',
    background:"#363636",
    textAlign:"center",
    color:"#fff",
    paddingLeft:"22px",

};

const navtabstyle={
    marginTop:"25px"
}

export default Profile