import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Offices from './Offices.js'
import Footer from './Footer.js'
import Header from './Header.js'


class Page extends React.Component{
    render(){
        return (
        <div>
            <Header companyName="blabla.com"/>
            <Offices />
            <Footer authorName="Jhon Diaz"/>
        </div>
        )
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
)

reportWebVitals();
