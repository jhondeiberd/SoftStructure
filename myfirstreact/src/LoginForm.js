import React from 'react'
import './index.css'

class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            "username":this.props.username,
            "pw":this.props.pw
        }
    }

    handleChange =(event)=> {
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
        return(
            <form style={{border:"1px solid black", width:"280px", backgroundColor:"cyan", textAlign:"right"}}>
                Username: <input type="text" name="username" value={this.state.username} onChange={(event)=>this.handleChange(event)}/> <br/>
                Password: <input type="password" name="pw" value={this.state.pw} onChange={(event)=>this.handleChange(event)}/> <br/>
                <button>Connect</button>
            </form>
        )
    }

}

export default LoginForm