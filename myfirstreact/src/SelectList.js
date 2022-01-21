import React from 'react'

class SelectList extends React.Component {
    constructor(props){
        super(props)
    }

    myList(oneItem, index){
        return (
            <option key={index} value={oneItem.code}>
                {oneItem.name}
            </option>
        )
    }

    render(){
        return(
            <select>
                {this.props.array.map(this.myList)}
            </select>
        )
    }
}
export default SelectList

