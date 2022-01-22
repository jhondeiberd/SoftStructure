import React from 'react'
// import './Footer.css'
import styles from './Footer.module.css'


class Footer extends React.Component {
    render() {
        return (
            <footer className={styles.foot}>
                <p className={styles.p20}> &copy; Jhon Diaz</p>
            </footer>
        )
    }
}

// class Footer extends React.Component {
//     render(){
//         return(
//             <footer>
//                 <p>&copy; Jhon Diaz</p>
//             </footer>
//         )
//     }
// }

// class Footer extends React.Component {
//     constructor (props) {
//         super(props)
//     }

//     render(){
//         if(this.props.authorName){
//             return(
//                 <footer>
//                     {this.props.authorName}
//                 </footer>
//             )
//         } else {
//             return(
//                 <footer>Error authorName props not provided</footer>
//             )
//         }
//     }
// }

export default Footer