import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'

import Nav from './Nav.js'
import Header from './Header.js'
import Footer from './Footer.js'
import SelectList from './SelectList.js'

// function React Component
// function Footer () {
//     return <footer>test</footer>
// }

const provinces=[ {code:'QC',name:'Quebec'},{code:'ON',name:'Ontario'},{code:'NB',name:'New-Brunswick'}]

const countries=[{code:'CA',name:'Canada'},{code:'US',name:'USA'},{code:'IN',name:'India'},{code:'MX',name:'Mexixo'}]

class Page extends React.Component{
    render(){
        return (
        <div>
            <Header companyName="Company1" />
            <p>Hello World !</p>
            <SelectList array={provinces} />
            <SelectList array={countries}/>
            <Footer authorName="Jhon Diaz"/>
        </div>
        )
    }
}

  ReactDOM.render(
      <Page />,
      document.getElementById('root')
  )

// const myH1 = <h1>Hello</h1>

// const myelement = (
//     <div>
//         <h1>Fruits</h1>
//         <h2>bananas</h2>
//         <h2>Fruits</h2>
//     </div>
// )

// ReactDOM.render(
//     // myH1,
//     // document.getElementById('root'),
//     myelement,
//     document.getElementById('root')
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
