import React from 'react';
import ChefService from "../Services/ChefService";
import OwnerService from "../Services/OwnerService";
import Link from "react-router-dom/es/Link";



class OwnerChefs extends React.Component{

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
        this.chefService=ChefService.instance
        this.hireChef=this.hireChef.bind(this);
        this.ownerService=OwnerService.instance
    }

    componentDidMount(){
        let userId=this.props.match.params.userId;

        this.setState({userId:userId});

        this.chefService.getAllUnhiredChefs()
            .then(unhired=>this.setState({unhired:unhired}))

        this.chefService.getAllHiredChefs(this.props.match.params.userId)
            .then(manager=>this.setState({hired:manager}))

        this.ownerService.getAllRestaurants(this.props.match.params.userId)
            .then(res=>this.setState({myRestaurants:res}))

    }

    componentWillReceiveProps(newProps){
        let userId=this.props.match.params.userId;

        this.setState({userId:userId});

        this.chefService.getAllUnhiredChefs()
            .then(unhired=>this.setState({unhired:unhired}))

        this.chefService.getAllHiredChefs(newProps.match.params.userId)
            .then(manager=>this.setState({hired:manager}))

        this.ownerService.getAllRestaurants(this.props.match.params.userId)
            .then(res=>this.setState({myRestaurants:res}))
    }

    hireChef(id,rest){
        this.chefService.hireChef(this.state.userId,id,rest)
            .then(()=>this.chefService.getAllUnhiredChefs()
                .then(unhired=>this.setState({unhired:unhired})))
            .then(()=>this.chefService.getAllHiredChefs(this.state.userId)
                .then(manager=>this.setState({hired:manager})))
    }

    render(){
        return(
            <div>
                <br/>
                <div className="row container-fluid">
                    <div className="col-3">
                        <button className="btn btn-outline-dark" style={{marginRight:"5px"}} onClick={()=>this.setState({hire:true})} type="button">Hire Chefs</button>
                        <br/><br/>
                        <ul className="list-group">
                            {this.state.hire===true && this.state.unhired.length>0 && this.state.unhired.map((unhired,index)=>(
                                <li className="list-group-item" key={index}>
                                    {unhired.firstName}

                                    <select className="form-control" onChange={(event)=>this.setState({selectRest:event.target.value})}>
                                        <option>Select</option>
                                        {this.state.myRestaurants.map((restaurant,index)=>(<option>{restaurant.name}</option>))}
                                    </select>

                                    <button className="btn btn-outline-dark float-right" style={{marginRight:"5px"}} onClick={()=>this.hireChef(unhired.id,this.state.selectRest)} type="button">Hire</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-6">
                        <h4>Hired Chefs</h4>
                        <br/>
                        {this.state.hired.length===0 && <h5>No Chefs Hired</h5>}
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

export default OwnerChefs;
