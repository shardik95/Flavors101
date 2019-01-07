import React from "react";
import ManagerService from "../Services/ManagerService";
import EventService from "../Services/EventService";

class ManagerEvents extends React.Component{

    constructor(props){
        super(props)
        this.state={
            userId:'',
            restaurant:'',
            create:false,
            name:'',
            people:'',
            time:'',
            events:[],
            manager:'',
            eventU:'',
            update:false,
            nameU:'',
            peopleU:'',
            timeU:''
        }
        this.managerService=ManagerService.instance;
        this.eventService=EventService.instance;
        this.createEvent=this.createEvent.bind(this)
        this.cancelEvent=this.cancelEvent.bind(this);
        this.updateEvent=this.updateEvent.bind(this);
    }

    componentDidMount(){
        let userId=this.props.match.params.userId;

        this.setState({userId:userId});


        this.managerService.getManager(this.props.match.params.userId)
            .then(manager=>this.setState({manager:manager}))
            .then(()=>this.state.manager.hired===true && this.managerService.getManagerById(this.props.match.params.userId))
                .then(manager=>this.setState({restaurant:manager}))
                .then(()=>this.eventService.getEvents(this.props.match.params.userId)
                    .then(events=>this.setState({events:events})))

    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId;

        this.setState({userId:userId});

        this.managerService.getManager(newProps.match.params.userId)
            .then(manager=>this.setState({manager:manager}))
            .then(()=>this.state.manager.hired===true && this.managerService.getManagerById(this.props.match.params.userId))
            .then(manager=>this.setState({restaurant:manager}))
            .then(()=>this.eventService.getEvents(newProps.match.params.userId)
                .then(events=>this.setState({events:events})))

    }

    updateEvent(){
        let event={
            eventName:this.state.nameU,
            time:this.state.timeU,
            noOfPeople:this.state.noOfPeople,
            id:this.state.eventU.id

        }
        this.eventService.updateEvent(event,this.state.userId)
            .then(()=>this.eventService.getEvents(this.state.userId)
                .then(events=>this.setState({events:events,update:false})))
    }

    cancelEvent(eventId){
        this.eventService.deleteEvent(eventId)
            .then(()=>this.eventService.getEvents(this.state.userId)
                .then(events=>this.setState({events:events})))
    }

    createEvent(){

        let event={
            eventName:this.state.name,
            noOfPeople:this.state.people,
            time:this.state.time
        }

        this.eventService.createEvent(this.state.userId,event,this.state.restaurant.id)
            .then(()=>this.eventService.getEvents(this.state.userId)
                .then(events=>this.setState({events:events})))

    }

    render(){

        return(
            <div className="row container-fluid">
                <div className="col-3">
                    {this.state.manager.hired===true &&
                        <div><br/>
                        <button className="btn btn-outline-dark" style={{marginRight:"5px"}} onClick={()=>this.setState({create:true})} type="button">Create Event</button>
                        <br/><br/>
                        {this.state.restaurant!=='' && this.state.create===true && <form>
                            <div>
                                <label>Event Name</label>
                                <input type="text" className='form-control' placeholder='Event Name'  onChange={(event)=>this.setState({name:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>No of People</label>
                                <input type="text" className='form-control' placeholder='No of People' onChange={(event)=>this.setState({people:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>Time</label>
                                <input type="text" className='form-control' placeholder='Time' onChange={(event)=>this.setState({time:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <button type="button" className="btn btn-outline-dark" onClick={()=>this.createEvent()}>Submit</button>
                            </div>
                        </form>}
                        </div>}
                </div>
                <div className="col-5">
                    <br/>
                    {this.state.manager.hired===true && <div>
                        <h4>My Events</h4>
                        <br/>
                        {this.state.events.length===0 && <h5>No Events</h5>}
                        <ul className="list-group">
                            {this.state.events.length>0 && this.state.events.map((event,index)=>(
                                <li className="list-group-item" key={index}>
                                    {event.eventName}
                                    <button className="btn btn-outline-dark float-right"
                                            style={{marginRight: "5px"}}
                                            onClick={() => this.setState({eventU:event,update:true})}
                                            type="button">Update Event
                                    </button>

                                    <button className="btn btn-outline-dark float-right"
                                            style={{marginRight: "5px"}}
                                            onClick={() => this.cancelEvent(event.id)}
                                            type="button">Delete Event
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>}
                </div>
                {this.state.manager.hired===false && <h3>You are not hired yet</h3>}


                <div className="col-3">
                    {this.state.update===true &&
                    <div><br/>

                        {this.state.update===true && <form>
                            <div>
                                <label>Event Name</label>
                                <input type="text" className='form-control' placeholder='Event Name' defaultValue={this.state.eventU.eventName} onChange={(event)=>this.setState({nameU:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>No of People</label>
                                <input type="text" className='form-control' placeholder='No of People' defaultValue={this.state.eventU.noOfPeople}
                                       onChange={(event)=>this.setState({peopleU:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <label>Time</label>
                                <input type="text" className='form-control' placeholder='Time' defaultValue={this.state.eventU.time}
                                       onChange={(event)=>this.setState({timeU:event.target.value})}/>
                            </div>
                            <br/>
                            <div>
                                <button type="button" className="btn btn-outline-dark" onClick={()=>this.updateEvent()}>Update</button>
                            </div>
                        </form>}
                    </div>}
                </div>
            </div>
        )
    }

}

export default ManagerEvents;