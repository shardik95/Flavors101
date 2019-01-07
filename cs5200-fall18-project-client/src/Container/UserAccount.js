import React from "react";
import PersonService from "../Services/PersonService";

class UserAccount extends React.Component{

    constructor(props){
        super(props);
        this.state={
            user:'',
            update:false,
            session:false,
            updatemsg:false
        }
        this.updateProfile=this.updateProfile.bind(this);
        this.personService = PersonService.instance;
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

    updateProfile(newUser){
        this.personService.updateUser(newUser)
            .then(()=>{
                this.setState({updatemsg:true})
                return this.personService.getSession()
            })
            .then((json)=>(this.setState({user:json})))
    }

    render(){
        let newUser=this.state.user
        return(
            <div style={{marginTop:"1%"}}>
                <div className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Account Overview</b></u></div>
                <div className="alert alert-success" role="alert" hidden={!this.state.updatemsg}>
                    Profile Update Successfully!
                </div>
                <br/>
                <div className="row">
                    <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}}>
                        <h4>Profile</h4>
                        <div>
                            <b>Username</b><br/>
                            {this.state.user.username}
                        </div>
                        <br/>
                        <div>
                            <b>Password</b><br/>
                            {this.state.user.password}
                        </div>
                        <br/>
                        <div>
                            <b>First Name</b><br/>
                            {this.state.user.firstName}
                        </div>
                        <br/>
                        <div>
                            <b>Last Name</b><br/>
                            {this.state.user.lastName}
                        </div>
                        <br/>
                        <div>
                            <b>Email</b><br/>
                            {this.state.user.email}
                        </div>
                        <br/>
                        <div>
                            <b>Phone</b><br/>
                            {this.state.user.phone}
                        </div>
                        <br/>
                        <button className="btn btn-outline-dark btn-block" onClick={()=>this.setState({update:true})}>Edit Profile</button>
                    </div>

                <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}} hidden={!this.state.update}>
                    <h4>Edit your profile</h4>
                    <div>
                        <b>Username</b><br/>
                        <input className="form-control" defaultValue={this.state.user.username}
                               placeholder={this.state.user.username} onChange={(e)=>newUser.username=e.target.value}/>
                    </div>
                    <br/>
                    <div>
                        <b>Password</b><br/>
                        <input className="form-control" defaultValue={this.state.user.password}
                               placeholder={this.state.user.password} onChange={(e)=>newUser.password=e.target.value}/>
                    </div>
                    <br/>
                    <div>
                        <b>First Name</b><br/>
                        <input className="form-control" defaultValue={this.state.user.firstName}
                               placeholder={this.state.user.firstName}  onChange={(e)=>newUser.firstName=e.target.value}/>
                    </div>
                    <br/>
                    <div>
                        <b>Last Name</b><br/>
                        <input className="form-control" defaultValue={this.state.user.lastName}
                               placeholder={this.state.user.lastName}  onChange={(e)=>newUser.lastName=e.target.value}/>
                    </div>
                    <br/>
                    <div>
                        <b>Email</b><br/>
                        <input className="form-control" defaultValue={this.state.user.email}
                               placeholder={this.state.user.email} onChange={(e)=>newUser.email=e.target.value}/>
                    </div>
                    <br/>
                    <div>
                        <b>Phone</b><br/>
                        <input className="form-control" defaultValue={this.state.user.phone}
                               placeholder={this.state.user.phone} onChange={(e)=>newUser.phone=e.target.value}/>
                    </div>
                    <br/>
                    <button className="btn btn-outline-dark btn-block" onClick={()=>this.updateProfile(newUser)}>Update Profile</button>
                </div>
            </div>
            </div>
        )
    }

}

export default UserAccount;