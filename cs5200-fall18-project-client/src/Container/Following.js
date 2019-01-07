import React from "react";
import FollowerService from "../Services/FollowerService";
import PersonService from "../Services/PersonService";
import FollowingService from "../Services/FollowingService";
import {Link} from "react-router-dom";

class Following extends React.Component{

    constructor(props){
        super(props)
        this.state={
            profileUserId:'',
            following:'',

        }
        this.followingService=FollowingService.instance;
        this.personService=PersonService.instance;
    }

    componentDidMount(){
        let profileUserId=this.props.match.params.userId;

        this.setState({profileUserId:profileUserId});

        this.state.profileUserId!==''&&this.followingService.getFollowing(this.state.profileUserId)
            .then(followers=>this.setState({following:followers}))





    }

    componentWillReceiveProps(newprops){
        let profileUserId=newprops.match.params.userId;

        this.setState({profileUserId:profileUserId});

        this.followingService.getFollowing(this.state.profileUserId)
            .then(followers=>this.setState({following:followers}))
            .then(()=>console.log(this.state.following))

    }


    render(){
        return(
            <div>
                <br/>
                {this.state.following.length>0 && <div>
                    <ul className="list-group">
                        {this.state.following.map((result,index)=> {

                            return <li className="list-group-item" key={index}>
                                <Link to={`/user/profile/${result.myid}`}>{
                                    result.firstName
                                }</Link>
                            </li>
                        })}
                    </ul>
                </div>}
            </div>
        )
    }

}

export default Following;