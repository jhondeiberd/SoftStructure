import React from 'react'

class Nav extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        if(this.props.mylink){
            return (
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href={this.props.mylink}>Variable link</a></li>
                    </ul>
                </nav>
            )
        } else {
            return(
                <div>Error mylink props not provvided</div>
            )
        }
    }
}

export default Nav
