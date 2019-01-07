import React from "react";
import ChefService from "../Services/ChefService";

class ChefRestaurant extends React.Component {

    constructor(props){
        super(props);
        this.state={
            userId:'',
            restaurant:'',
            chef:''
        }
        this.chefService=ChefService.instance;
    }

    componentDidMount(){
        let userId=this.props.match.params.userId;

        this.setState({userId:userId});

        this.chefService.getChef(this.props.match.params.userId)
            .then(chef=>this.setState({chef:chef}))
            .then(()=>this.state.chef.hired===true && this.chefService.getChefRestaurantById(this.props.match.params.userId)
                .then(manager=>this.setState({restaurant:manager})))


    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId;

        this.setState({userId:userId});

        this.chefService.getChef(this.props.match.params.userId)
            .then(chef=>this.setState({chef:chef}))
            .then(()=>this.state.chef.hired===true && this.chefService.getChefRestaurantById(this.props.match.params.userId)
                .then(manager=>this.setState({restaurant:manager})))
    }

    render(){
        return(
            <div>
               <br/>
                {this.state.chef.hired===true && <table className="table-bordered col-centered" style={{width:"40%"}}>
                    <tbody>
                    <tr>
                        <td><b>Name:</b></td>
                        <td>{this.state.restaurant.name}
                        </td>
                    </tr>
                    <tr>
                        <td><b>Cuisine:</b></td>
                        <td>{this.state.restaurant.cuisine}</td>
                    </tr>
                    <tr>
                        <td><b>Phone:</b></td>
                        <td>{this.state.restaurant.phone}</td>
                    </tr>
                    <tr>
                        <td><b>Location:</b></td>
                        <td>{this.state.restaurant.location}
                        </td>
                    </tr>
                    </tbody>
                </table>}

                {this.state.chef.hired===false && <h3>You are not hired yet!</h3>}
            </div>
        )
    }

}

export default ChefRestaurant;