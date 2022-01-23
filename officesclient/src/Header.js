import React from 'react'
import styles from './Header.css'

 class Header extends React.Component {
    constructor(props){
        super(props)
        // initialize companyName with props input
        this.state= {companyName:this.props.companyName}
    }

    changeName =(newname)=>{
        this.setState({companyName:newname})
    }

    render(){
        return (
            <header className={styles.header}>
                Welcome to {this.state.companyName}
                <button className={styles.button} onClick={()=>this.changeName(document.getElementById("newname").value)}>Change name</button>
                <input type="text" name="newname" id="newname"/>
            </header>
        )
    }
}

export default Header