import React from 'react'
// import './Header.css'
import styles from './Header.module.css'

class Header extends React.Component {
    constructor (props) {
        super(props)
    }

    render(){
        if(this.props.companyName){
            return(
                <header>
                    <p className={styles.p1}>Some text</p>
                    {this.props.companyName}
                </header>
            )
        } else {
            return(
                <header>Error companyName props not provided</header>
            )
        }
    }
}


export default Header