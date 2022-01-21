'use strict'
// use strict forces variable declaration before use

// to use the express framework, must do npm install express
const express = require('express')
const app = express()

// Install CORS to respond to requests from pages not served by this server
const cors = require('cors')
app.use(cors())

// start server
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
    res.end('<h1>Welcome to offices microservice API</h1>')
})

// Show all offices
app.get('/offices', (req, res) => {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('select * from offices', (offices) => {
        if (offices.rowCount > 0) {
            const officesJSON = { msg: 'All offices', offices: offices.rows } // keep only the data records rows
            const officesJSONString = JSON.stringify(officesJSON, null, 4) // convert JSON to JSON data string
            res.writeHead(200, { 'Content-Type': 'application/json' }) // set HTTP response content type for JSON
            res.end(officesJSONString) // send out the JSON data string
        } else {
            // set content type
            const officesJSON = { msg: 'Table empty, no offices found' }
            const officesJSONString = JSON.stringify(officesJSON, null, 4)
            res.writeHead(404, { 'Content-Type': 'application/json' })
            // send out a string
            res.end(officesJSONString)
        }
        DB.disconnect()
    })
})

// Show office by ID
app.get('/offices/:id', (req, res) => {
    const id = req.params.id
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('SELECT * from offices WHERE officecode=$1', [id],
        function (offices) {
            if (offices.rowCount === 1) {
                const officesJSON = { msg: 'OK', offices: offices.rows[0] }
                const officesJSONString = JSON.stringify(officesJSON, null, 4)
                // set content type
                res.writeHead(200, { 'Content-Type': 'application/json' })
                // send out a string
                res.end(officesJSONString)
            } else {
                // set content type
                const officesJSON = { msg: 'Office not found' }
                const officesJSONString = JSON.stringify(officesJSON, null, 4)
                res.writeHead(404, { 'Content-Type': 'application/json' })
                // send out a string
                res.end(officesJSONString)
            }
            DB.disconnect()
        }
    )
})

// Save a new office
app.post('/offices',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const officecode = request.body.officecode
        const city = request.body.city
        const phone = request.body.phone
        const addressline1 = request.body.addressline1
        const addressline2 = request.body.addressline2
        const state = request.body.state
        const country = request.body.country
        const postalcode = request.body.postalcode
        const territory = request.body.territory

        const DB = require('./src/dao')
        DB.connect()

        DB.queryParams('INSERT INTO offices VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
            [officecode, city, phone, addressline1, addressline2, state, country, postalcode, territory], function (customers) {
                const officesJSON = { msg: 'OK office added' }
                const officesJSONString = JSON.stringify(officesJSON, null, 4)
                // set content type
                response.writeHead(200, { 'Content-Type': 'application/json' })
                // send out a string
                response.end(officesJSONString)
                DB.disconnect()
            })
    }
)

// Update an office
app.put('/offices/:officecode',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const officecode = request.params.officecode
        const newofficecode = request.body.officecode
        const city = request.body.city
        const phone = request.body.phone
        const addressline1 = request.body.addressline1
        const addressline2 = request.body.addressline2
        const state = request.body.state
        const country = request.body.country
        const postalcode = request.body.postalcode
        const territory = request.body.territory

        const DB = require('./src/dao')
        DB.connect()

        DB.queryParams('UPDATE offices SET officecode=$1,city=$2,phone=$3,addressline1=$4,addressline2=$5,state=$6,country=$7,postalcode=$8,territory=$9 WHERE officecode=$10',
            [newofficecode, city, phone, addressline1, addressline2, state, country, postalcode, territory, officecode], function (customers) {
                const officesJSON = { msg: 'OK office updated' }
                const officesJSONString = JSON.stringify(officesJSON, null, 4)
                // set content type
                response.writeHead(200, { 'Content-Type': 'application/json' })
                // send out a string
                response.end(officesJSONString)
                DB.disconnect()
            })
    }
)

// Delete an office
// DELETE
app.delete('/offices/:id', function (request, response) {
    const id = request.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()

    DB.queryParams('DELETE from offices WHERE officecode=$1', [id], function (offices) {
        const officesJSON = { msg: 'OK office deleted' }
        const officesJSONString = JSON.stringify(officesJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(officesJSONString)
        DB.disconnect()
    })
})
