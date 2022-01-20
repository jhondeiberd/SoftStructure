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

const tableinfile = require('./src/tableinfile')
const filaName = 'users.json'

// Get all offices
app.get('/offices', function (req, res) {
    const offices = tableinfile.getTable(filaName)
    if (Object.keys(offices).length !== 0) {
        const officesString = JSON.stringify(offices)
        res.statusMessage = 'All ok' // custom error message if required
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(officesString)
    } else {
        res.statusMessage = 'No users created yet'
    }
})

// Get office by ID
app.get('/offices/:id', function (req, res) {
    const office = tableinfile.getRec(filaName, Number(req.params.id))
    if (Object.keys(office).length !== 0) {
        const userString = JSON.stringify(office)
        res.statusMessage = 'All ok' // custom error message if required
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(userString)
    } else {
        res.statusMessage = 'User not found' // custom error message if required
        res.writeHead(404, { 'Content-type': 'application/json' })
        res.end()
    }
})

// List all offices
app.get('/customers_list', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from customers', function (customers) {
        let html = ''
        html += 'Number of customers: ' + customers.rowCount + '<br>'
        html += '<table>'
        for (let i = 0; i < customers.rowCount; i++) {
            html += '<tr><td>' + customers.rows[i].customernumber +
            '</td><td>' + customers.rows[i].customername +
            '</td><td>' + customers.rows[i].city + '</td></tr>'
        }
        html += '</table>'

        // use the page template of course to display the list
        const pageData = {} // initialize empty object
        pageData.title = 'Customers List'
        pageData.description = 'Customers Number and Name'
        pageData.author = 'Jhon Diaz'
        // send out the html table
        pageData.content = html
        response.render('master_template', pageData)
        DB.disconnect()
    })
})
