import React from "react";
import PersonService from "../Services/PersonService";
import ChefService from "../Services/ChefService";
import OwnerService from "../Services/OwnerService";
import ManagerService from "../Services/ManagerService";
import EventService from "../Services/EventService";
import RestaurantService from "../Services/RestaurantService";
import ReviewService from "../Services/ReviewService";

class Admin extends React.Component{

    constructor(props){
        super(props)
        this.state={
            user:'',
            session:'',
            selectedOption:'',
            users:'',
            selectedUser:'',
            selected:'',
            role:[],
            inputChange:'',
            validation:false,
            updateMsg:false,
            restaurants:[],
            selectedRest:'',
            owners:[],
            review:false,
            reviews:[],
            newReview:'',
            reviewSelected:false,
            custId:'',
            restName:'',
            reviewUpdated:'',
            reviewName:''
        }
        this.personService = PersonService.instance;
        this.chefService = ChefService.instance;
        this.ownerService = OwnerService.instance;
        this.managerService = ManagerService.instance;
        this.eventService=EventService.instance;
        this.restaurantService=RestaurantService.instance;
        this.reviewService=ReviewService.instance;
        this.logout = this.logout.bind(this);
        this.renderRole=this.renderRole.bind(this);
        this.selectOwner = this.selectOwner.bind(this);
        this.deleteOwner = this.deleteOwner.bind(this);
        this.selectManager = this.selectManager.bind(this);
        this.deleteManager = this.deleteManager.bind(this);
        this.selectChef = this.selectChef.bind(this);
        this.deleteChef = this.deleteChef.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.selectCustomer = this.selectCustomer.bind(this);
        this.createCustomer=this.createCustomer.bind(this);
        this.createChef = this.createChef.bind(this);
        this.createManager = this.createManager.bind(this);
        this.createOwner = this.createOwner.bind(this);
        this.deleteEvent=this.deleteEvent.bind(this);
        this.deleteReservation=this.deleteReservation.bind(this);
        this.deleteReview=this.deleteReview.bind(this);
        this.renderDomain=this.renderDomain.bind(this);
        this.selectRestaurant=this.selectRestaurant.bind(this);
        this.deleteRestaurant=this.deleteRestaurant.bind(this);
        this.createRestaurant=this.createRestaurant.bind(this);
        this.updateRest=this.updateRest.bind(this);
        this.renderReview=this.renderReview.bind(this);
        this.createReview=this.createReview.bind(this);
        this.deleteReview=this.deleteReview.bind(this);
        this.updateReview=this.updateReview.bind(this);
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
                    this.setState({user:response,session:true})
                }
            })
    }

    updateReview(review){

        this.reviewService.updateReview(review)
            .then(()=>this.reviewService.getAllReviews()
                .then(reviews=>this.setState({reviews:reviews})))

    }

    deleteReview(id){
        this.reviewService.deleteReview(id)
            .then(()=>this.reviewService.getAllReviews()
                .then(reviews=>this.setState({reviews:reviews})))

    }

    createReview(){

        let r = {
            review:this.state.newReview
        }

        this.reviewService.createReview(r,this.state.custId,this.state.restName)
            .then(()=>this.reviewService.getAllReviews()
                .then(reviews=>this.setState({reviews:reviews})))
    }

    logout(){
        this.personService.logout();
        this.setState({user:'',session:false})
        this.props.history.push("/")
    }

    updateRest(newRest){
        this.restaurantService.updateRest(newRest)
            .then(rest=> this.setState({updatemsg:true,selectedRest:rest,selected:false}))
            .then(()=>this.restaurantService.getAllRestaurants(this.state.selectedRest.id)
                .then(users=>this.setState({selectedRest:users,selected:false})))
    }

    selectRestaurant(rest){
        this.setState({selectedRest:rest,selected:true})
    }

    deleteRestaurant(id){
        this.restaurantService.deleteRestaurant(id)
            .then(()=>this.restaurantService.getAllRestaurants())
            .then(rests=>this.setState({restaurants:rests,selected:false}))
    }

    createRestaurant(){
        if(this.state.inputChange===''){
            this.setState({validation:true})
        }
        else{
            this.setState({validation:false})
            let rest= {
                name: this.state.inputChange
            }
            this.ownerService.createRestaurantadmin(rest)
                .then(()=>this.restaurantService.getAllRestaurants())
                .then(rests=>this.setState({restaurants:rests,selected:false}))
        }
    }

    deleteEvent(id){

        this.eventService.cancelEvent(this.state.selectedUser.id,id)
            .then(()=>this.personService.findUserById(this.state.selectedUser.id)
                .then(users=>this.setState({selectedUser:users,selected:false})))
    }

    deleteReservation(id){
        this.restaurantService.cancelReservation(id,this.state.selectedUser.id)
            .then(()=>this.personService.findUserById(this.state.selectedUser.id)
                .then(users=>this.setState({selectedUser:users,selected:false})))
    }

    deleteReview(id){
        this.reviewService.deleteReview(id)
            .then(()=>this.personService.findUserById(this.state.selectedUser.id)
                .then(users=>this.setState({selectedUser:users,selected:false})))
    }

    selectCustomer(customer){
        this.setState({selectedUser:customer,selected:true})
    }

    deleteCustomer(id){
        this.personService.deleteUser(id)
            .then(()=>this.personService.findAllCustomers()
                .then(users=>this.setState({role:users,selected:false})))
    }

    selectChef(chef){
        this.setState({selectedUser:chef,selected:true})
    }

    deleteChef(id){
        this.personService.deleteUser(id)
            .then(()=>this.chefService.findAllChefs()
                .then(users=>this.setState({role:users,selected:false})))
    }

    selectManager(mgr){
        this.setState({selectedUser:mgr,selected:true})
    }

    deleteManager(id){
        this.personService.deleteUser(id)
            .then(()=>this.managerService.findAllManagers()
                .then(users=>this.setState({role:users,selected:false})))
    }

    selectOwner(owner){
        this.setState({selectedUser:owner,selected:true})
    }

    deleteOwner(id){
        this.personService.deleteUser(id)
            .then(()=>this.ownerService.findAllOwners()
                .then(users=>this.setState({role:users,selected:false})))
    }

    createCustomer(){
        if(this.state.inputChange===''){
            this.setState({validation:true})
        }
        else{
            this.setState({validation:false})
            let user= {
                username: this.state.inputChange,
                role: 'Customer',
                password: this.state.inputChange
            }
            this.personService.createCustomer(user)
                .then(()=>this.personService.findAllCustomers()
                    .then(users=>this.setState({role:users,selected:false})))
        }
    }

    createChef(){
        if(this.state.inputChange===''){
            this.setState({validation:true})
        }
        else{
            this.setState({validation:false})
            let user= {
                username: this.state.inputChange,
                role: 'Chef',
                password: this.state.inputChange
            }
            this.chefService.createChef(user)
                .then(()=>this.chefService.findAllChefs()
                    .then(users=>this.setState({role:users,selected:false})))
        }
    }

    createOwner(){
        if(this.state.inputChange===''){
            this.setState({validation:true})
        }
        else{
            this.setState({validation:false})
            let user= {
                username: this.state.inputChange,
                role: 'Owner',
                password: this.state.inputChange
            }
            this.ownerService.createOwner(user)
                .then(()=>this.ownerService.findAllOwners()
                    .then(users=>this.setState({role:users,selected:false})))
        }
    }

    createManager(){
        if(this.state.inputChange===''){
            this.setState({validation:true})
        }
        else{
            this.setState({validation:false})
            let user= {
                username: this.state.inputChange,
                role: 'Manager',
                password: this.state.inputChange
            }
            this.managerService.createManager(user)
                .then(()=>this.managerService.findAllManagers()
                    .then(users=>this.setState({role:users,selected:false})))
        }
    }

    updateProfile(newUser){

        this.personService.update(newUser)
            .then(user=> this.setState({updatemsg:true,selectedUser:user,selected:false}))
            .then(()=>this.render())
            .then(()=>this.personService.findUserById(this.state.selectedUser.id)
                .then(users=>this.setState({selectedUser:users,selected:false})))

    }

    renderReview(review){
        this.setState({review:true})
        this.reviewService.getAllReviews()
            .then(reviews=>this.setState({reviews:reviews}))
    }

    renderRole(role){
        this.setState({selectedOption: role})
        if(role ==='Customer'){
            this.personService.findAllCustomers()
                .then(users=>this.setState({role:users}))
        }
        else if(role==='Chef'){
            this.chefService.findAllChefs()
                .then(users=>this.setState({role:users}))
        }
        else if(role ==='Manager'){
            this.managerService.findAllManagers()
                .then(users=>this.setState({role:users}))
        }
        else if(role ==='Owner'){
            this.ownerService.findAllOwners()
                .then(users=>this.setState({role:users}))
        }
    }

    renderDomain(domain){
        this.setState({selectedOption: domain})
        if(domain==='Restaurant'){
            this.restaurantService.getAllRestaurants()
                .then(restaurants=>this.setState({restaurants:restaurants}))
        }
    }

    render(){

        let newUser=this.state.selectedUser;
        let newRest = this.state.selectedRest;

        return(
            <div>
                Hello Admin!

                <nav className="navbar fixed-top navbar-light" style={{background:"#363636"}}>
                    <button className="navbar-brand btn" onClick={()=>this.props.history.push("/")} style={{color:"#fff",background:"#363636"}}>
                        Flavors101</button>

                    <form className="form-inline">

                        <h3 style={{color:"#fff",marginRight:"10px"}} hidden={!this.state.session}>Hi, {this.state.user.firstName}</h3>
                        <div hidden={!this.state.session}>
                            <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                        </div>
                    </form>
                </nav>

                <div style={{margin:"7%"}}>
                    <div className="row">
                        <div className="col-4">
                            <form style={{textAlign:'center'}}>
                                <label>Select Type of Role</label>
                            </form>
                        </div>
                        <div className="col-8">
                            <select className="form-control" onChange={(e)=>this.renderRole(e.target.value)}>
                                <option>Select Role</option>
                                <option>Customer</option>
                                <option>Chef</option>
                                <option>Manager</option>
                                <option>Owner</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{margin:"7%"}}>
                    <div className="row">
                        <div className="col-4">
                            <form style={{textAlign:'center'}}>
                                <label>Select Type of Domain</label>
                            </form>
                        </div>
                        <div className="col-8">
                            <select className="form-control" onChange={(e)=>this.renderDomain(e.target.value)}>
                                <option>Select Role</option>
                                <option>Restaurant</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div style={{margin:"7%"}}>
                    <div className="row">
                        <div className="col-4">
                            <form style={{textAlign:'center'}}>
                                <label>Select Type of Relationship</label>
                            </form>
                        </div>
                        <div className="col-8">
                            <select className="form-control" onChange={(e)=>this.renderReview(e.target.value)}>
                                <option>Select Role</option>
                                <option>Review</option>

                            </select>
                        </div>
                    </div>
                </div>

                <div className="row" style={{marginTop:"5%",marginLeft:"5%"}}>
                    <div className="col-3">
                        {console.log(this.state.selectedOption)}
                        <ul className="list-group">
                            {this.state.restaurants.length>0 && this.state.selectedOption ==='Restaurant' &&
                            <li className="list-group-item active bg-dark" style={{border:"0px"}}>
                                Restaurants
                            </li>}
                            {this.state.restaurants.length>0 && this.state.selectedOption==='Restaurant' && this.state.restaurants.map((cust,index)=>(
                                 <li className="list-group-item"  key={index}>
                                    <span onClick={()=>this.selectRestaurant(cust)}>{cust.name}</span>
                                    <button className="btn btn-outline-dark float-right"  onClick={()=>this.deleteRestaurant(cust.id)}>Delete</button>
                                </li>
                            ))}<br/>
                            {this.state.restaurants.length>0 && this.state.selectedOption==='Restaurant' && <div className='row'>
                                <div className='col-8'>
                                    <input className="form-control" onChange={e=>this.setState({inputChange:e.target.value})}/>
                                    {this.state.validation && <span style={{color:'red'}}>Type Something</span>}

                                </div>
                                <div className="col-1">
                                    <span style={{color:'red'}}>*</span>

                                </div>
                                <div className='col-1'>
                                    <button className="btn btn-outline-dark" onClick={()=>this.createRestaurant()}>
                                        Create
                                    </button>
                                </div>
                            </div>}
                        </ul>

                        <ul className="list-group">
                            {this.state.role.length>0 && this.state.selectedOption ==='Customer' &&
                            <li className="list-group-item active bg-dark" style={{border:"0px"}}>
                                Customers
                            </li>}
                            {this.state.role.length>0 && this.state.selectedOption==='Customer' && this.state.role.map((cust,index)=>(
                                cust.role==='Customer' && <li className="list-group-item"  key={index}>
                                    <span onClick={()=>this.selectCustomer(cust)}>{cust.username}</span>
                                    <button className="btn btn-outline-dark float-right"  onClick={()=>this.deleteCustomer(cust.id)}>Delete</button>
                                </li>
                            ))}<br/>
                            {this.state.role.length>0 && this.state.selectedOption==='Customer' && <div className='row'>
                                <div className='col-8'>
                                <input className="form-control" onChange={e=>this.setState({inputChange:e.target.value})}/>
                                {this.state.validation && <span style={{color:'red'}}>Type Something</span>}
                                </div>
                                <div className="col-1">
                                <span style={{color:'red'}}>*</span>

                                </div>
                                <div className='col-1'>
                                <button className="btn btn-outline-dark" onClick={()=>this.createCustomer()}>
                                Create
                                </button>
                                </div>
                            </div>}
                        </ul>


                        <ul className="list-group">
                            {this.state.role.length>0 && this.state.selectedOption ==='Chef' &&
                            <li className="list-group-item active bg-dark" style={{border:"0px"}}>
                                Chefs
                            </li>}
                            {this.state.role.length>0 && this.state.selectedOption==='Chef' && this.state.role.map((cust,index)=>(
                                cust.role==='Chef' && <li className="list-group-item"  key={index}>
                                    <span onClick={()=>this.selectChef(cust)}>{cust.username}</span>
                                    <button className="btn btn-outline-dark float-right"  onClick={()=>this.deleteChef(cust.id)}>Delete</button>
                                </li>
                            ))}<br/>
                            {this.state.role.length>0 && this.state.selectedOption==='Chef' && <div className='row'>
                                <div className='col-8'>
                                    <input className="form-control" onChange={e=>this.setState({inputChange:e.target.value})}/>
                                    {this.state.validation && <span style={{color:'red'}}>Type Something</span>}
                                </div>
                                <div className="col-1">
                                    <span style={{color:'red'}}>*</span>

                                </div>
                                <div className='col-1'>
                                    <button className="btn btn-outline-dark" onClick={()=>this.createChef()}>
                                        Create
                                    </button>
                                </div>
                            </div>}
                        </ul>


                        <ul className="list-group">
                            {this.state.role.length>0 && this.state.selectedOption ==='Manager' &&
                            <li className="list-group-item active bg-dark" style={{border:"0px"}}>
                                Manager
                            </li>}
                            {this.state.role.length>0 && this.state.selectedOption==='Manager' && this.state.role.map((cust,index)=>(
                                cust.role==='Manager' && <li className="list-group-item"  key={index}>
                                    <span onClick={()=>this.selectManager(cust)}>{cust.username}</span>
                                    <button className="btn btn-outline-dark float-right"  onClick={()=>this.deleteManager(cust.id)}>Delete</button>
                                </li>
                            ))}<br/>
                            {this.state.role.length>0 && this.state.selectedOption==='Manager' && <div className='row'>
                                <div className='col-8'>
                                    <input className="form-control" onChange={e=>this.setState({inputChange:e.target.value})}/>
                                    {this.state.validation && <span style={{color:'red'}}>Type Something</span>}
                                </div>
                                <div className="col-1">
                                    <span style={{color:'red'}}>*</span>

                                </div>
                                <div className='col-1'>
                                    <button className="btn btn-outline-dark" onClick={()=>this.createManager()}>
                                        Create
                                    </button>
                                </div>
                            </div>}
                        </ul>

                        <ul className="list-group">
                            {this.state.role.length>0 && this.state.selectedOption ==='Owner' &&
                            <li className="list-group-item active bg-dark" style={{border:"0px"}}>
                                Owner
                            </li>}
                            {this.state.role.length>0 && this.state.selectedOption==='Owner' && this.state.role.map((cust,index)=>(
                                cust.role==='Owner' && <li className="list-group-item"  key={index}>
                                    <span onClick={()=>this.selectOwner(cust)}>{cust.username}</span>
                                    <button className="btn btn-outline-dark float-right"  onClick={()=>this.deleteOwner(cust.id)}>Delete</button>
                                </li>
                            ))}<br/>
                            {this.state.role.length>0 && this.state.selectedOption==='Owner' && <div className='row'>
                                <div className='col-8'>
                                    <input className="form-control" onChange={e=>this.setState({inputChange:e.target.value})}/>
                                    {this.state.validation && <span style={{color:'red'}}>Type Something</span>}
                                </div>
                                <div className="col-1">
                                    <span style={{color:'red'}}>*</span>

                                </div>
                                <div className='col-1'>
                                    <button className="btn btn-outline-dark" onClick={()=>this.createOwner()}>
                                        Create
                                    </button>
                                </div>
                            </div>}
                        </ul>


                        <ul className="list-group">
                            {this.state.reviews.length>0 && this.state.review ===true &&
                            <li className="list-group-item active bg-dark" style={{border:"0px"}}>
                                Reviews
                            </li>}
                            {this.state.reviews.length>0 && this.state.review===true && this.state.reviews.map((cust,index)=>(
                                <li className="list-group-item"  key={index}>
                                    <span onClick={()=>this.setState({reviewSelected:true,reviewUpdated:cust})}>{cust.review}</span>
                                    <button className="btn btn-outline-dark float-right"  onClick={()=>this.deleteReview(cust.id)}>Delete</button>
                                </li>
                            ))}<br/>
                            {this.state.reviews.length>0 && this.state.review===true && <div className='row'>
                                <div className='col-8'>
                                    <input className="form-control" onChange={e=>this.setState({newReview:e.target.value})}/>
                                    {this.state.validation && <span style={{color:'red'}}>Type Something</span>}

                                    <label>CustomerId</label>
                                    <input className="form-control" onChange={e=>this.setState({custId:e.target.value})}/>

                                    <label>Restaurant name</label>
                                    <input className="form-control" onChange={e=>this.setState({restName:e.target.value})}/>
                                </div>
                                <div className="col-1">
                                    <span style={{color:'red'}}>*</span>

                                </div>
                                <div className='col-1'>
                                    <button className="btn btn-outline-dark" onClick={()=>this.createReview()}>
                                        Create
                                    </button>
                                </div>
                            </div>}
                        </ul>

                    </div>

                    {this.state.selectedRest==='' && this.state.selectedUser!=='' && <div className="col-9">
                        <div className="row">
                            <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}} hidden={!this.state.selected}>
                                <div className="alert alert-success" role="alert" hidden={!this.state.updateMsg}>
                                    Profile Update Successfully!
                                </div>
                                <h4>Profile</h4>
                                <div>
                                    <b>Username</b><br/>
                                    {this.state.selectedUser.username}
                                </div>
                                <br/>
                                <div>
                                    <b>Password</b><br/>
                                    {this.state.selectedUser.password}
                                </div>
                                <br/>
                                <div>
                                    <b>First Name</b><br/>
                                    {this.state.selectedUser.firstName}
                                </div>
                                <br/>
                                <div>
                                    <b>Last Name</b><br/>
                                    {this.state.selectedUser.lastName}
                                </div>
                                <br/>
                                <div>
                                    <b>Email</b><br/>
                                    {this.state.selectedUser.email}
                                </div>
                                <br/>
                                <div>
                                    <b>Address</b><br/>
                                    {this.state.selectedUser.address}
                                </div>
                                <br/>
                                <div>
                                    <b>Phone</b><br/>
                                    {this.state.selectedUser.phone}
                                </div>
                                <br/>
                                <div>
                                    {this.state.selectedUser.role==='Customer' && <ul className="list-group">
                                        <li className="list-group-item active bg-dark">Events</li>
                                        {this.state.selectedUser.attendingEvents.length>0 && this.state.selectedUser.attendingEvents.map((ev,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {ev.eventName}
                                            </li>))}
                                    </ul>}
                                    <br/>
                                    {this.state.selectedUser.role==='Customer' && <ul className="list-group">
                                        <li className="list-group-item active bg-dark">Reservations</li>
                                        {this.state.selectedUser.reservedRestaurants.length>0 && this.state.selectedUser.reservedRestaurants.map((rr,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {rr.name}
                                            </li>))}
                                    </ul>}
                                    <br/>
                                    {this.state.selectedUser.role==='Customer'&&<ul className="list-group">
                                        <li className="list-group-item active bg-dark">Reviews</li>
                                        {this.state.selectedUser.reviews.length>0 && this.state.selectedUser.reviews.map((rev,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {rev.review}
                                            </li>))}
                                    </ul>}
                                </div>
                                <br/>
                                <button className="btn btn-outline-dark btn-block" onClick={()=>this.setState({update:true})}>Edit Profile</button>
                                <br/>
                            </div>

                            <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}} hidden={!this.state.update}>
                                <h4>Edit profile</h4>
                                <div>
                                    <b>Username</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.username}
                                           placeholder={this.state.selectedUser.username} onChange={(e)=>newUser.username=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Password</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.password}
                                           placeholder={this.state.selectedUser.password} onChange={(e)=>newUser.password=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>First Name</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.firstName}
                                           placeholder={this.state.selectedUser.firstName}  onChange={(e)=>newUser.firstName=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Last Name</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.lastName}
                                           placeholder={this.state.selectedUser.lastName}  onChange={(e)=>newUser.lastName=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Email</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.email}
                                           placeholder={this.state.selectedUser.email} onChange={(e)=>newUser.email=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Address</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.address}
                                           placeholder={this.state.selectedUser.address}  onChange={(e)=>newUser.address=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Phone</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.phone}
                                           placeholder={this.state.selectedUser.phone} onChange={(e)=>newUser.phone=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    {this.state.selectedUser.role==='Customer'&& <ul className="list-group">
                                        <li className="list-group-item active bg-dark">Events</li>
                                        {this.state.selectedUser.attendingEvents.length>0 && this.state.selectedUser.attendingEvents.map((ev,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {ev.eventName}
                                                <button className="btn btn-outline-dark  float-right" onClick={()=>this.deleteEvent(ev.id)}>Delete Event</button>
                                            </li>))}
                                    </ul>}
                                    <br/>
                                    {this.state.selectedUser.role==='Customer'&&<ul className="list-group">
                                        <li className="list-group-item active bg-dark">Reservations</li>
                                        {this.state.selectedUser.reservedRestaurants.length>0 && this.state.selectedUser.reservedRestaurants.map((rr,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {rr.name}
                                                <button className="btn btn-outline-dark  float-right" onClick={()=>this.deleteReservation(rr.id)}>Delete Reservation</button>
                                            </li>))}
                                    </ul>}
                                    {this.state.selectedUser.role==='Customer'&&<ul className="list-group">
                                        <li className="list-group-item active bg-dark">Reviews</li>
                                        {this.state.selectedUser.reviews.length>0 && this.state.selectedUser.reviews.map((rev,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {rev.review}
                                                <button className="btn btn-outline-dark  float-right" onClick={()=>this.deleteReview(rev.id)}>Delete Review</button>
                                            </li>))}
                                    </ul>}



                                </div>
                                <br/>
                                <button className="btn btn-outline-dark btn-block" onClick={()=>this.updateProfile(newUser)}>Update Profile</button>
                            </div>




                        </div>

                    </div>}



                    {this.state.selectedRest!=='' &&this.state.selectedUser==='' && <div className="col-9">
                        <div className="row">
                            <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}} hidden={!this.state.selected}>
                                <div className="alert alert-success" role="alert" hidden={!this.state.updateMsg}>
                                    Profile Update Successfully!
                                </div>
                                <h4>Profile</h4>
                                <div>
                                    <b>Name</b><br/>
                                    {this.state.selectedRest.name}
                                </div>
                                <br/>
                                <div>
                                    <b>Location</b><br/>
                                    {this.state.selectedRest.location}
                                </div>
                                <br/>
                                <div>
                                    <b>Cuisine</b><br/>
                                    {this.state.selectedRest.cuisine}
                                </div>
                                <br/>


                                <button className="btn btn-outline-dark btn-block" onClick={()=>this.setState({update:true})}>Edit Profile</button>
                                <br/>
                            </div>


                            <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}} hidden={!this.state.update}>
                                <h4>Edit profile</h4>
                                <div>
                                    <b>Name</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedRest.name}
                                           placeholder={this.state.selectedRest.name} onChange={(e)=>newRest.name=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Location</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedRest.location}
                                           placeholder={this.state.selectedRest.location} onChange={(e)=>newRest.location=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Cuisine</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedRest.cuisine}
                                           placeholder={this.state.selectedUser.firstName}  onChange={(e)=>newRest.cuisine=e.target.value}/>
                                </div>
                                <br/>
                                <button className="btn btn-outline-dark btn-block" onClick={()=>this.updateRest(newRest)}>Update Profile</button>
                            </div>


                        </div>

                    </div>}


                    {this.state.reviewSelected===true && <div className="col-9">
                        <div className="row">
                            <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}}>
                                <div className="alert alert-success" role="alert" hidden={!this.state.updateMsg}>
                                    Profile Update Successfully!
                                </div>
                                <h4>Profile</h4>
                                <div>
                                    <b>Review</b><br/>
                                    {this.state.reviewUpdated.review}
                                </div>
                                <br/>

                                <button className="btn btn-outline-dark btn-block" onClick={()=>this.setState({update:true})}>Edit Profile</button>
                                <br/>
                            </div>


                            <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}} hidden={!this.state.update}>
                                <h4>Edit profile</h4>
                                <div>
                                    <b>Review</b><br/>
                                    <input className="form-control" defaultValue={this.state.reviewUpdated.review}
                                           placeholder={this.state.reviewUpdated.review} onChange={(e)=>this.setState({reviewName:e.target.value})}/>
                                </div>
                                <br/>

                                <button className="btn btn-outline-dark btn-block" onClick={()=>this.updateReview({review:this.state.reviewName,id:this.state.reviewUpdated.id})}>Update Profile</button>
                            </div>


                        </div>

                    </div>}



                </div>

            </div>
        )
    }
}

export default Admin;