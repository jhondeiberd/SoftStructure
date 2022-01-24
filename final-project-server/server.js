'use strict'

const express = require('express')
const app = express()

// Use CORS to allow Ajax requests from other web sites
const cors = require('cors')
app.use(cors())

app.listen(8000,
    function () {
        console.log('Node server listening on port 8000')
    }
)

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// path module is built-in, part of basic node, no need to install
// const path = require('path')

// serve static html/css/js files, images etc..
// good old web site files
// in folder public_html
app.use(express.static('public_html'))

//* * ROUTES ************************************************************/
app.get('/', function (req, res) {
    res.writeHead(200)// optional because 200 is the default response code
    res.end('<h1>My PlayList</h1>')
})

// Show all tracks
app.get('/track', (req, res) => {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('select * from track', (track) => {
        if (track.rowCount > 0) {
            const trackJSON = { msg: 'All tracks', track: track.rows } // keep only the data records rows
            const trackJSONString = JSON.stringify(trackJSON, null, 4) // convert JSON to JSON data string
            res.writeHead(200, { 'Content-Type': 'application/json' }) // set HTTP response content type for JSON
            res.end(trackJSONString) // send out the JSON data string
        } else {
            // set content type
            const tracksJSON = { msg: 'Table empty, no tracks found' }
            const trackJSONString = JSON.stringify(tracksJSON, null, 4)
            res.writeHead(404, { 'Content-Type': 'application/json' })
            // send out a string
            res.end(trackJSONString)
        }
        DB.disconnect()
    })
})

// Add a new track
app.post('/track',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const playlistId = request.body.playlist_id
        const title = request.body.title
        const uri = request.body.uri
        const masterId = request.body.master_id

        const DB = require('./src/dao')
        DB.connect()

        DB.queryParams('INSERT INTO track VALUES ($1,$2,$3,$4)',
            [playlistId, title, uri, masterId], function (tracks) {
                const trackJSON = { msg: 'OK track added' }
                const trackJSONString = JSON.stringify(trackJSON, null, 4)
                // set content type
                response.writeHead(200, { 'Content-Type': 'application/json' })
                // send out a string
                response.end(trackJSONString)
                DB.disconnect()
            })
    }
)

// DELETE
app.delete('/track/:id', function (req, res) {
    const id = req.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()

    DB.queryParams('DELETE from track WHERE id=$1', [id], function (tracks) {
        const trackJSON = { msg: 'OK track deleted' }
        const trackJSONString = JSON.stringify(trackJSON, null, 4)
        // set content type
        res.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        res.end(trackJSONString)
        DB.disconnect()
    })
})
