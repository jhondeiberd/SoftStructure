import React from 'react'

class Header extends React.Component {
    constructor (props) {
        super(props)
    }

    render(){
        return(
            <header>
                {this.props.companyName}
            </header>
        )
    }
}


export default Header