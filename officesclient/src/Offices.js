import React from 'react';
import styles from './Offices.module.css'

/**
* offices components
* uses our office server REST API http://localhost:3001/offices
* props inputs: none
*/
class Offices extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.offices_index

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        offices_data : [], // will contain offices data array from server
        offices_index : 0, // the index of the office currently shown, start at first in array
        offices_count : 0, // how many offices in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null       // no errors yet !
      };
    }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
    componentDidMount() {

       // AJAX call using fetch. Make sure the office server is running !
       // see https://reactjs.org/docs/faq-ajax.html
      fetch('http://localhost:8000/offices')
        .then(
            (response)=> {
                // here full fetch response object
                //console.log(response)
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => {
                        console.log(json_response)
                        this.setState({
                            offices_data:json_response.offices, // data received from server
                            offices_count:json_response.offices.length, // how many offices in array
                            offices_index:0,  // will first show the first office in the array
                            isLoaded : true,  // we got data
                            error : null // no errors
                        })
                    }
                    )

                }else{
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "office not found"}
                            // save the error in state for display below
                            error:json_response,   // something in format  {message: "office not found", db_data:{}}
                            offices_data: {}, // no data received from server
                            offices_count:0,
                            offices_index:0,
                        });
                    })
                }
            },

            (error) => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
                    offices_data: {}, // no data received from server
                    offices_count:0,
                    offices_index:0,
                });
            }
        )
    }

    Prev=() => {
        if (this.state.offices_index === 0) {
            this.setState({offices_index:this.offices_index =0})
        } else {
            this.setState({offices_index:this.state.offices_index -1})
        }
    }

    Next=() => {
        console.log(this.state.offices_data.length)
        if (this.state.offices_index === this.state.offices_data.length-1) {
            this.setState({offices_index:this.offices_index = this.state.offices_index})
        } else {
            this.setState({offices_index:this.state.offices_index +1})
        }
    }

    handleChange = (event) => {
        const i=this.state.offices_index
        this.setState(state => {
            const list = state.offices_data.map((office, j) => {
                if (j === i) {
                office[event.target.name]=event.target.value
                return office;
                } else {
                return office;
                }
            });
            return {
            list,
          };
        }
    )}

    ClearTable=() => {
        document.getElementById('newofficecode').value = ""
        document.getElementById('newcity').value = ""
        document.getElementById('newphone').value = ""
        document.getElementById('newaddressline1').value = ""
        document.getElementById('newaddressline2').value = ""
        document.getElementById('newstate').value = ""
        document.getElementById('newcountry').value = ""
        document.getElementById('newpostalcode').value = ""
        document.getElementById('newterritory').value = ""
    }


    // display the offices table
    render() {
        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.offices_count!==0){
                // office table not empty
                return (
                    <div className={styles.panel300}>
                        <b>List of offices from server localhost:8000/offices</b><br/><br/>
                        <table className={styles.table}>
                            <tbody>
                            <tr><th className={styles.th}>Office code</th><td className={styles.td}> <input type="text" name="newofficecode" id="newofficecode" value={this.state.offices_data[this.state.offices_index].officecode} onChange={(event)=>this.handleChange(event)} /> </td></tr>
                            <tr><th className={styles.th}>City</th><td className={styles.td}> <input type="text"  name="newcity" id="newcity" value={this.state.offices_data[this.state.offices_index].city} onChange={(event)=>this.handleChange(event)}/></td></tr>
                            <tr><th className={styles.th}>Phone</th><td className={styles.td}> <input type="text" name="newphone" id="newphone" value={this.state.offices_data[this.state.offices_index].phone} onChange={(event)=>this.handleChange(event)}/></td></tr>
                            <tr><th className={styles.th}>Addressline1</th><td className={styles.td}> <input type="text" name="newaddressline1" id="newaddressline1" value={this.state.offices_data[this.state.offices_index].addressline1} onChange={(event)=>this.handleChange(event)}/></td></tr>
                            <tr><th className={styles.th}>Addressline2</th><td className={styles.td}> <input type="text" name="newaddressline2" id="newaddressline2" value={this.state.offices_data[this.state.offices_index].addressline2} onChange={(event)=>this.handleChange(event)}/></td></tr>
                            <tr><th className={styles.th}>State</th><td className={styles.td}> <input type="text" name="newstate" id="newstate" value={this.state.offices_data[this.state.offices_index].state} onChange={(event)=>this.handleChange(event)}/></td></tr>
                            <tr><th className={styles.th}>Country</th><td className={styles.td}> <input type="text" name="newcountry"  id="newcountry" value={this.state.offices_data[this.state.offices_index].country} onChange={(event)=>this.handleChange(event)}/></td></tr>
                            <tr><th className={styles.th}>Postalcode</th><td className={styles.td}> <input type="text" name="newpostalcode" id="newpostalcode" value={this.state.offices_data[this.state.offices_index].postalcode} onChange={(event)=>this.handleChange(event)}/></td></tr>
                            <tr><th className={styles.th}>Territory</th><td className={styles.td}> <input type="text" name="newterritory" id="newterritory" value={this.state.offices_data[this.state.offices_index].territory} onChange={(event)=>this.handleChange(event)}/></td></tr>
                            </tbody>
                        </table>
                            <button className={styles.button} onClick={()=>this.Prev()}>Prev</button>
                            <label> {this.state.offices_index+1} to {this.state.offices_data.length}</label>
                            <button className={styles.button} onClick={()=>this.Next()}>Next</button><br/>

                            <button className={styles.button} onClick={()=>this.handleChange()}>Save</button>
                            <button className={styles.button} onClick={()=>this.Delete()}>Delete</button>
                            <button className={styles.button} onClick={()=>this.ClearTable()}>Clear form to add a new office</button>
                    </div>
                )
            }else{
                return(<div><b>office table is empty</b></div>)
            }
        }else{
            return (<div><b>Waiting for server ...</b></div>)
        }
    }
  }

export default Offices;