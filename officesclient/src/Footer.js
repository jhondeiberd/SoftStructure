import React from 'react'
import styles from './Footer.css'


class Footer extends React.Component {
    render() {
        return (
            <footer className={styles.foot}>
                &copy; {this.props.authorName}
            </footer>
        )
    }
}

export default Footer