import React from 'react'




class Playlist extends React.Component {
    constructor(props) {
        super(props)
          // set initial state
        // do not use setState in constructor, write state directly
        this.state = {
        music_albums : [], // will contain dresses data array from server
        music_index : 0, // the index of the dress currently shown, start at first in array
        music_count : 0, // how many dresses in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null ,      // no errors yet !
        server_messgae:''


        }
    }
    componentDidMount() {
        fetch('http://localhost:8000/track')
        .then(
            (response)=> {
                console.log(response)
                if (response.ok) {
                    response.json().then(json_response =>{
                        console.log(json_response.track)
                        this.setState({
                            music_albums:json_response.track,
                            music_count: Object.keys(json_response.track).length,
                            music_index : 0,
                            isLoaded : true,
                            error : null
                        })
                    })
                }else{
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            error:json_response,
                            office_data :{},
                            office_index : 0,
                            office_count:0
                        })
                    })
                }
            }
        )
    }

    DeleteData=(id)=>{
        //this.setState({[event.target.name]:event.target.value})
        console.log(id)
        let url='http://localhost:8000/track/'+ id
        console.log(url)
        fetch(url,
            {
                method: 'delete',
            }
        )
        .then((response)=>{
            if (response.ok) {
                this.setState({server_messgae:'Data Deleted'})
                this.componentDidMount()
            }else{
                this.setState({server_messgae:'Data can not be deleted'})
            }
        })

    }


        render() {
            let arrayItems=this.state.music_albums.map((data,index) => {
                return(
                    <tr>

                    <td>
                    {data.title}  <br/>
                    ID: {data.id}<br/>
                    Playlist :{data.playlist_id}<br/>
                    <a href={data.uri}> {data.uri} </a>
                    </td>

                    <td>
                        <button onClick={()=>this.DeleteData(data.id)} >Delete </button>
                    </td>

                    <br></br>
                    </tr>
                )
            })
            return(

                <div>
                    <p>Server Message: { this.state.server_messgae}</p>
               <div className='DisplayContent'>

               <div className='Playlist'>
               <h4>My Playlist</h4>
               <div className='Table' >
                   <table>

                       {arrayItems}

                   </table>
               </div>
               </div>


               </div>
               </div>
            )
        }



}




export default Playlist