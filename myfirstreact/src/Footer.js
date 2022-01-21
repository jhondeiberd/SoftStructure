import React from 'react'

class Footer extends React.Component {
    constructor (props) {
        super(props)
    }

    render(){
        return(
            <footer>
                {this.props.authorName}
            </footer>
        )
    }
}

export default Footer