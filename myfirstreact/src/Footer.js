import React from 'react'

class Footer extends React.Component {
    constructor (props) {
        super(props)
    }

    render(){
        if(this.props.authorName){
            return(
                <footer>
                    {this.props.authorName}
                </footer>
            )
        } else {
            return(
                <footer>Error authorName props not provided</footer>
            )
        }
    }
}

export default Footer