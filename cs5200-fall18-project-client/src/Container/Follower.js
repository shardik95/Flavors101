import React from "react";
import FollowerService from "../Services/FollowerService";
import {Link} from "react-router-dom";
import PersonService from "../Services/PersonService";

class Follower extends React.Component{

    constructor(props){
        super(props)
        this.state={
            profileUserId:'',
            followers:'',
            follow:[]
        }
        this.followerService=FollowerService.instance;
        this.personService=PersonService.instance;
    }

    componentDidMount(){
        let profileUserId=this.props.match.params.userId;

        this.setState({profileUserId:profileUserId});

        this.followerService.getFollower(this.state.profileUserId)
            .then(followers=>this.setState({followers:followers}))

    }

    componentWillReceiveProps(newProps){
        let profileUserId=newProps.match.params.userId;

        this.setState({profileUserId:profileUserId});

        this.followerService.getFollower(this.state.profileUserId)
            .then(followers=>this.setState({followers:followers}))


    }

    render(){
        let u={};
        return(
            <div>
                <br/>
                {this.state.followers.length>0 && <div>
                    <ul className="list-group">
                        {this.state.followers.map((result,index)=> {

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

export default Follower;