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
        server_messgae:'',
        discog_albums:[]
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

    AddDataToPlayList=(id)=>{
        console.log(id)
    }

    SearchDataThroughAPI=()=>{
        let key='ZyZwXQsAyfGdBUukMtkc'
        let secret='ltXEwZDWSKFvbcZwFxqldAcSSyjSlDel'
        let search=document.getElementById('Artist_Name').value
        document.getElementById('Artist_Name').value=''

        let url='https://api.discogs.com/database/search?key='+key+'&secret='+secret+'&artist='+search+'&country=canada'
        console.log(url)
        fetch(url,
            {
                method: 'get',
            }
        )
        .then((response)=>{

            if (response.ok) {
                response.json().then(json_response =>{
                        console.log(json_response.results)
                        if(Object.keys(json_response.results).length===0){
                            this.setState({server_messgae:'Not Found'})
                        }else{
                            this.setState({
                                discog_albums:json_response.results
                            })
                        }

                })
            }else{
                this.setState({server_messgae:'API error'})
            }
        })
    }

        render() {
            let dataBaseArrayItems=this.state.music_albums.map((data,index) => {
                return(

                    <tbody key={index}>
                        <td >
                    {data.title}  <br/>
                    ID: {data.id}<br/>
                    Playlist :{data.playlist_title}<br/>
                    <a href={data.uri}> {data.uri} </a>
                    </td>

                    <td>
                        <button onClick={()=>this.DeleteData(data.id)} >Delete </button>
                    </td>


                    </tbody>

                )
            })


            let discordArrayItems=this.state.discog_albums.map((data,index) => {
                return(
                    <tbody key={index}>
                    <td >
                {data.label}  <br/>

                ID: {data.master_id}<br/>
                Playlist :{data.genre}<br/>
                <a href={data.uri}> {data.uri} </a>
                </td>

                <td>
                    <button onClick={()=>this.AddDataToPlayList(data.master_id)} > Add </button>
                </td>


                </tbody>
                )

            })
            return(

                <div>
                    <p>Server Message: { this.state.server_messgae}</p>
               <div className='DisplayContent'>

               <div className='Playlist'>
               <h4>My Playlist</h4>
               <div className='' >
                   <table>

                       {dataBaseArrayItems}

                   </table>


               </div>
               </div>

               <div className='API'>
               <h4>Music Provided By Discogs.com  </h4>
               <pre><b>Search By Artist</b> <input type="text" id='Artist_Name' /><b> Candian releases only </b></pre>

               <button onClick={()=>this.SearchDataThroughAPI()} >Search </button><br/>

               <div>

                    {discordArrayItems}

               </div>
               </div>


               </div>
               </div>
            )
        }



}




export default Playlist