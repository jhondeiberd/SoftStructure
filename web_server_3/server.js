'use strict'

const express = require('express')
const app = express()

// use CORS to allow
const cors = require('cors')
app.use(cors())

// start server
app.listen(8000,
    function () {
        console.log('Node server listening on port 8000')
    }
)

// const { read } = require('fs')
app.set('view engine', 'ejs')

// server page in public_html directly

app.use(express.static('public_html'))

app.get('/',
    function (req, res) {
        res.send('<h1>Hello World</h1>')
    }
)

app.get('/',
    function (req, res) {
        res.writeHead(200, { 'contect-Type': 'application/json' })
        res.end('<h1>Hello World</h1>')
    }
)

// app.get('/offices',
//     function (req, res) {
//         const filename = 'offices.html'
//         res.sendFile(path.join(__dirname, 'public_html', filename))
//     }
// )

/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// server responds with the list of customers in a JSON string
app.get('/offices', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('select * from offices', function (offices) {
        const officesJSON = { offices: offices.rows } // keep only the data records rows
        // convert JSON to JSON data string
        const officesJSONString = JSON.stringify(officesJSON, null, 4)
        // set HTTP response content type for JSON
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out the JSON data string
        response.end(officesJSONString)
    })
})
