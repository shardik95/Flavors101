import React from "react";
import PersonService from "../Services/PersonService";
import Link from "react-router-dom/es/Link";
import RestaurantService from "../Services/RestaurantService";

class CustomerReservation extends React.Component{

    constructor(props){
        super(props)
        this.state={
            userId:'',
            user:''
        }
        this.personService=PersonService.instance;
        this.cancelReservation=this.cancelReservation.bind(this);
        this.restaurantService=RestaurantService.instance;
    }

    componentDidMount(){
        let userId=this.props.match.params.userId;

        this.setState({userId:userId});

        this.personService.findUserById(this.props.match.params.userId)
            .then(user=>this.setState({user:user}))
    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId;

        this.setState({userId:userId});

        this.personService.findUserById(newProps.match.params.userId)
            .then(user=>this.setState({user:user}))
    }

    cancelReservation(id){
        this.restaurantService.cancelReservation(id,this.state.userId)
            .then(()=>this.personService.findUserById(this.state.userId)
                .then(user=>this.setState({user:user})))
    }



    render(){
        return(
            <div>
                <br/><br/>
                <ul className="list-group">
                    {this.state.user!=='' && <ul className="list-group-item"><b>My Reservations</b></ul>}
                    {this.state.user!=='' && this.state.user.reservedRestaurants.map((result,index)=>(
                        <li className="list-group-item" key={index}><Link to={`/page/restaurant/${result.id}`}>{result.name}</Link>

                            <button className="btn btn-outline-dark float-right"
                                    style={{marginRight:"5px"}} onClick={()=>this.cancelReservation(result.id)} type="button">Cancel</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default CustomerReservation;