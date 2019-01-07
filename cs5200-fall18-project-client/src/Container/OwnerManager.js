import React from 'react';
import OwnerService from "../Services/OwnerService";
import ManagerService from "../Services/ManagerService";
import {Link} from "react-router-dom";

class OwnerManager extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId:'',
            hire:false,
            unhired:[],
            hired:[],
            myRestaurants:[],
            selectRest:''
        }
        this.managerService=ManagerService.instance
        this.hireManager=this.hireManager.bind(this);
        this.ownerService=OwnerService.instance
    }

    componentDidMount(){
        let userId=this.props.match.params.userId;

        this.setState({userId:userId});

        this.managerService.getAllUnhiredManagers()
            .then(unhired=>this.setState({unhired:unhired}))

        this.managerService.getAllHiredManagers(this.props.match.params.userId)
            .then(manager=>this.setState({hired:manager}))

        this.ownerService.getAllRestaurants(this.props.match.params.userId)
            .then(res=>this.setState({myRestaurants:res}))


    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId;

        this.setState({userId:userId});

        this.managerService.getAllUnhiredManagers()
            .then(unhired=>this.setState({unhired:unhired}))

        this.managerService.getAllHiredManagers(newProps.match.params.userId)
            .then(manager=>this.setState({hired:manager}))

        this.ownerService.getAllRestaurants(newProps.match.params.userId)
            .then(res=>this.setState({myRestaurants:res}))
    }

    hireManager(id,rest){


        this.managerService.hireManager(this.state.userId,id,rest)
            .then(()=>this.managerService.getAllUnhiredManagers()
                .then(unhired=>this.setState({unhired:unhired})))
            .then(()=>this.managerService.getAllHiredManagers(this.state.userId)
                .then(manager=>this.setState({hired:manager})))
    }

    render(){
        return(
            <div>
                <br/>
                <div className="row container-fluid">
                    <div className="col-6">
                        <button className="btn btn-outline-dark" style={{marginRight:"5px"}} onClick={()=>this.setState({hire:true})} type="button">Hire Manager</button>
                        <br/><br/>
                        <ul className="list-group">
                        {this.state.hire===true && this.state.unhired.length>0 && this.state.unhired.map((unhired,index)=>(
                            <li className="list-group-item" key={index}>
                                {unhired.firstName}

                                <select className="form-control" onChange={(event)=>this.setState({selectRest:event.target.value})}>
                                    <option>Select</option>
                                    {this.state.myRestaurants.map((restaurant,index)=>(<option>{restaurant.name}</option>))}
                                </select>

                                <button className="btn btn-outline-dark float-right" style={{marginRight:"5px"}} onClick={()=>this.hireManager(unhired.id,this.state.selectRest)} type="button">Hire</button>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="col-6">
                        <h4>Hired Managers</h4>
                        <br/>
                        {this.state.hired.length===0 && <h5>No Managers Hired</h5>}
                        <ul className="list-group">
                        {this.state.hired.length>0 && this.state.hired.map((hire,index)=>(
                            <li className="list-group-item" key={index}>
                                <Link to={`/user/profile/${hire.id}`}>{hire.firstName}</Link>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default OwnerManager;