import React from 'react';
import {Link} from "react-router-dom";
import PersonService from "../Services/PersonService";
class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={
            username:'',
            password:''
        }
        this.login=this.login.bind(this)
        this.personService=PersonService.instance
    }

    componentDidMount(){

    }

    componentWillReceiveProps(newProps){

    }

    login(){

        let person={
            username:this.state.username,
            password:this.state.password
        }

        this.personService.loginUser(person)
            .then(json=>{
                if (json.username === 'CANNOT FIND')
                    alert("cannot find user")
                else {
                    this.props.history.push("/")
                }
            })

    }

    render(){
        return (<div style={{textAlign:'center'}}>
            <h1>Login</h1><br/>
            <Link to='/'>Home  </Link>
            <Link to='/register'>Register</Link>
            <br/>
            <div style={{marginRight:"40%",marginLeft:"40%"}}>
                <form>
                    <div>
                        <label>Username</label>
                        <input type="text" className='form-control' placeholder='Enter Username' onChange={(event)=>this.setState({username:event.target.value})}/>
                    </div>
                    <br/>
                    <div>
                        <label>Password</label>
                        <input type="password" className='form-control' placeholder='Enter password' onChange={(event)=>this.setState({password:event.target.value})}/>
                    </div>
                    <br/>
                    <div>
                        <button type="button" className="btn btn-outline-dark" onClick={()=>this.login()}>Login</button>
                    </div>
                </form>
            </div>

        </div>)
    }
}

export default Login;