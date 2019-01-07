import React from "react";
import EventService from "../Services/EventService";
import PersonService from "../Services/PersonService";

class CustomerEvents extends React.Component{

    constructor(props){
        super(props)
        this.state={
            userId:'',
            events:'',
            user:''
        }
        this.eventService=EventService.instance;
        this.personService=PersonService.instance
        this.attendEvent=this.attendEvent.bind(this);
        this.cancelEvent=this.cancelEvent.bind(this);
    }


    componentDidMount(){
        let userId=this.props.match.params.userId;

        this.setState({userId:userId});

        this.eventService.getAllEvents()
            .then(events=>this.setState({events:events}))

        this.personService.findUserById(this.props.match.params.userId)
            .then(user=>this.setState({user:user}))

    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId;

        this.setState({userId:userId});

        this.eventService.getAllEvents()
            .then(events=>this.setState({events:events}))

        this.personService.findUserById(this.props.match.params.userId)
            .then(user=>this.setState({user:user}))
    }

    attendEvent(eventId){
        this.eventService.attendEvent(this.state.userId,eventId)
            .then(()=>this.personService.findUserById(this.state.userId)
                .then(user=>this.setState({user:user})))
            .then(()=>this.eventService.getAllEvents()
                .then(events=>this.setState({events:events})))
    }

    cancelEvent(eventId){
        this.eventService.cancelEvent(this.state.userId,eventId)
            .then(()=>this.personService.findUserById(this.state.userId)
                .then(user=>this.setState({user:user})))
            .then(()=>this.eventService.getAllEvents()
                .then(events=>this.setState({events:events})))
    }

    render(){
        let x=false;
        return(
            <div className="row container-fluid">
                <div className="col-6">
                    <br/>
                    {this.state.events.length===0 && <h5>No Events</h5>}
                    {this.state.events.length!==0 && <h5>Event List</h5>}
                    <ul className="list-group">
                        {this.state.events.length>0 && this.state.events.map((event,index)=> {
                            x=false
                           return <li className="list-group-item" key={index}>
                                {event.eventName}
                                   {this.state.user.attendingEvents!==undefined && this.state.user.attendingEvents.length>0
                                       && this.state.user.attendingEvents.map((event1,index)=>{
                                        if(event1.id===event.id)
                                            x=true
                                   })}
                                   {x===false && <button className="btn btn-outline-dark float-right"
                                        style={{marginRight: "5px"}}
                                        onClick={() => this.attendEvent(event.id)}
                                        type="button">Attend
                                </button>}
                               {x===true && <button className="btn btn-outline-dark float-right"
                                                     style={{marginRight: "5px"}}
                                                     onClick={() => this.cancelEvent(event.id)}
                                                     type="button">Not attending?
                               </button>}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }

}

export default CustomerEvents;