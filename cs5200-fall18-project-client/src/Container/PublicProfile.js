import React from "react";
import PersonService from "../Services/PersonService";
import {Link, Route} from "react-router-dom";
import FollowerService from "../Services/FollowerService";
import FollowingService from "../Services/FollowingService";
import Following from "./Following";
import Follower from "./Follower";

class PublicProfile extends React.Component{

    constructor(props){
        super(props)
        this.state={
            user:'',
            session:'',
            profileUserId:'',
            profileUser:'',
            isFollowing:''

        }
        this.logout=this.logout.bind(this)
        this.personService=PersonService.instance
        this.follow=this.follow.bind(this)
        this.unFollow=this.unFollow.bind(this)
        this.followerService=FollowerService.instance
        this.followingService=FollowingService.instance
    }

    componentDidMount(){

        let profileUserId=this.props.match.params.userId;

        this.setState({profileUserId:profileUserId});

        this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response,session:true})
                }
            })

        this.personService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
            .then(()=>this.followingService.isFollowing(this.state.profileUserId,this.state.user))
            .then(c=>this.setState({isFollowing:c}))

    }

    componentWillReceiveProps(newprops){

        let profileUserId=newprops.match.params.userId;

        this.setState({profileUserId:profileUserId});

        this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response,session:true})
                }
            })

        this.personService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
            .then(()=>this.followingService.isFollowing(this.state.profileUserId,this.state.user))
            .then(c=>this.setState({isFollowing:c}))
    }

    logout(){
        this.personService.logout();
        this.setState({user:'',session:false})
        this.props.history.push("/")
    }

    follow(){

        this.followerService.createFollower(this.state.user.id,this.state.profileUser)
            .then(follower=>console.log(follower))
        this.followingService.createFollowing(this.state.profileUserId,this.state.user)
            .then(following=>console.log(following))
            .then(()=>this.personService.findUserById(this.state.profileUserId)
                .then(user=>this.setState({profileUser:user}))
                .then(()=>this.followingService.isFollowing(this.state.profileUserId,this.state.user))
                .then(c=>this.setState({isFollowing:c})))
    }

    unFollow(){

        this.followerService.deleteFollower(this.state.user.id,this.state.profileUser)
            .then(follower=>console.log(follower))
        this.followingService.deleteFollowing(this.state.profileUserId,this.state.user)
            .then(following=>console.log(following))
            .then(()=>this.personService.findUserById(this.state.profileUserId)
                .then(user=>this.setState({profileUser:user}))
                .then(()=>this.followingService.isFollowing(this.state.profileUserId,this.state.user))
                .then(c=>this.setState({isFollowing:c})))
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
                            <Link to="/profile"><button className="btn btn-outline-light" style={{marginRight:"10px"}} type="button">Profile</button></Link>
                            <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                        </div>
                    </form>
                </nav>
                <br/>


                <div style={{marginTop:"2%"}} className="row container-fluid">

                    <div className="col-3" style={divStyle}>
                        <i className="fa fa-5x fa-user-circle" style={{marginTop:'45px',color:'#fff'}}/>
                        <h3>@{this.state.profileUser.username}
                        </h3>

                        {(this.state.user.role==='Customer' || this.state.user.role==='Chef') && this.state.isFollowing===false
                        &&<button className="btn btn-primary" onClick={()=>this.follow()}>Follow</button>}

                        {(this.state.user.role==='Customer' || this.state.user.role==='Chef') && this.state.isFollowing===true
                        &&<button className="btn btn-primary" onClick={()=>this.unFollow()}>UnFollow</button>}
                        <br/>
                        <br/>
                        <div style={{border:"1px solid white"}}>
                            <p>Name: {this.state.profileUser.firstName} {this.state.profileUser.lastName}</p>
                            <p>Email: {this.state.profileUser.email} </p>
                        </div>
                    </div>

                    {(this.state.user.role==='Customer' || this.state.user.role==='Chef') &&<div className="col-9">
                        <ul className="nav nav-tabs" style={navtabstyle}>
                            <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/profile/${this.state.profileUser.id}/followers`}>Followers</Link>
                            </li>
                            <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/profile/${this.state.profileUser.id}/following`}> Following</Link>
                            </li>
                        </ul>
                        <Route path="/user/profile/:userId/followers"
                               component={Follower} />
                        <Route path="/user/profile/:userId/following"
                               component={Following}/>

                    </div>}

                </div>

            </div>
        )
    }

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

export default PublicProfile