import React from 'react';
import {Link} from "react-router-dom";
import PersonService from "../Services/PersonService";
class Register extends React.Component{

    constructor(props){
        super(props)
        this.state={
            firstName:'',
            lastName:'',
            username:'',
            password:'',
            confirmPassword:'',
            email:'',
            address:'',
            phone:'',
            Role:''
        }
        this.create=this.create.bind(this)
        this.personService = PersonService.instance;
    }

    componentDidMount(){

    }

    componentWillReceiveProps(newProps){

    }

    create(){


       let user = {
           firstName:this.state.firstName,
           lastName:this.state.lastName,
           username:this.state.username,
           password:this.state.password,
           email:this.state.email,
           address:this.state.address,
           phone:this.state.phone,
           role:this.state.Role
        }


        this.personService.createUser(user)
            .then(user=>(

                <div>
                    {this.props.history.push("/profile")}
                </div>
            ))
    }

    render(){
        return (<div style={{textAlign:'center'}}>
            <h1>Register</h1>
            <Link to='/'>Home </Link>
            <Link to='/login'>Login</Link>
            <br/>
            <div style={{marginRight:"40%",marginLeft:"40%"}}>
                <form>
                    <div>
                        <label>Username</label>
                        <input type="text" className='form-control' placeholder='Enter Username'  onChange={(event)=>this.setState({username:event.target.value})}/>
                    </div>
                    <br/>
                    <div>
                        <label>Password</label>
                        <input type="password" className='form-control' placeholder='Enter password' onChange={(event)=>this.setState({password:event.target.value})}/>
                    </div>
                    <br/>
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" className='form-control' placeholder='Confirm password' onChange={(event)=>this.setState({confirmPassword:event.target.value})}/>
                    </div>
                    <br/>
                    <div>
                        <label>First Name</label>
                        <input type="text" className='form-control' placeholder='Enter First Name' onChange={(event)=>this.setState({firstName:event.target.value})}/>
                    </div>
                    <br/>
                    <div>
                        <label>Last Name</label>
                        <input type="text" className='form-control' placeholder='Enter Last Name' onChange={(event)=>this.setState({lastName:event.target.value})}/>
                    </div>
                    <br/>
                    <div>
                        <label>Email</label>
                        <input type="text" className='form-control' placeholder='Enter Email' onChange={(event)=>this.setState({email:event.target.value})}/>
                    </div>
                    <br/>
                    <div>
                        <label>Phone</label>
                        <input type="text" className='form-control' placeholder='Enter Phone' onChange={(event)=>this.setState({phone:event.target.value})}/>
                    </div>
                    <br/>
                    <div>
                        <label>Address</label>
                        <input type="text" className='form-control' placeholder='Enter Address' onChange={(event)=>this.setState({address:event.target.value})}/>
                    </div>
                    <br/>
                    <div>
                        <label>Select your role </label>
                        <select className="form-control" onChange={(event)=>this.setState({Role:event.target.value})}>
                            <option>Select</option>
                            <option>Customer</option>
                            <option>Chef</option>
                            <option>Manager</option>
                            <option>Owner</option>
                        </select>
                    </div>
                    <br/>
                    <div>
                        <button type="button" className="btn btn-outline-dark" onClick={()=>this.create()}>Register</button>
                    </div>

                </form>
            </div>

        </div>)
    }
}

export default Register;