'use strict'

// const { console } = require('console')
// without Express
// const { read } = require('fs')
// const http = require('http')

// http.createServer(function (req, res) {
//     res.writeHead(200, { 'content-Type': 'text/html' })
//     res.write('<h1>Hello word</h1>')
//     res.end()
// }).listen(8000)

// console.log('server listening on port 8000')

const path = require('path')
const express = require('express')
const app = express()

// use CORS to allow
const cors = require('cors')
app.use(cors())

// const { read } = require('fs')
app.set('view engine', 'ejs')

// server page in public_html directly

app.use(express.static('public_html'))

app.get('/chair',
    function (req, res) {
        const filename = 'chair_response.html'
        res.sendFile(path.join(__dirname, 'public_html', filename))
    }
)

app.get('/',
    function (req, res) {
        res.send('<h1>Hello World Express</h1>')
    }
)

app.get('/',
    function (req, res) {
        res.writeHead(200, { 'contect-Type': 'application/json' })
        res.end('<h1>Hello World Express json</h1>')
    }
)

app.get('/byebye',
    function (req, res) {
        res.send('<h3>World Bye Bye</h3>')
    }
)

/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

app.get('/test-param/:a/:b',
    function (req, res) {
        console.log(req.params.a)
        console.log(req.params.b)
        res.send('parameter received')
    }
)

// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html
app.post('/form_validate',
    function (req, res) {
        // get the form inputs from the body of the HTTP request
        console.log(req.body)
        const username = req.body.username
        const password = req.body.password
        console.log('username=' + username + ' password=' + password)
        // process form, validate data …
        if (username === '' || password === '') {
            res.writeHead(400, { 'Content-Type': 'text/html' })
            res.end('missing username or password...')
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end('Thanks for submitting the form...')
        }
    }
)

// start server
app.listen(8000,
    function () {
        console.log('Node server listening on port 8000')
    }
)

app.get('/products', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Product Catalog'
    pageData.description = 'Huge selection of products for all your needs'
    pageData.author = 'Jhon Diaz'
    const products = [
        { id: 1, name: 'white shoes', price: '99.99' },
        { id: 2, name: 'black shoes', price: '69.99' },
        { id: 3, name: 'blue shoes', price: '79.99' }
    ]
    pageData.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData.content += '<tr><td>' + products[i].id + '</td>'
        pageData.content += '<td>' + products[i].name + '</td>'
        pageData.content += '<td>' + products[i].price + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('master_template', pageData)
})

app.get('/seasons', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Seasons list'
    pageData.description = 'Seasons'
    pageData.author = 'Jhon Diaz'
    const seasons = [
        { id: 1, name: 'Spring' },
        { id: 2, name: 'Summer' },
        { id: 3, name: 'Fall' },
        { id: 4, name: 'Winter' }
    ]
    pageData.content = '<table>'
    for (let i = 0; i < seasons.length; i++) {
        pageData.content += '<tr><td>' + seasons[i].id + '</td>'
        pageData.content += '<td>' + seasons[i].name + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('master_template', pageData)
})

// const { Client } = require('pg')

// const DB = new Client({
//     host: 'localhost',
//     port: 5432,
//     database: 'classicmodels',
//     user: 'postgres',
//     password: 'postgres'
// })

// DB.connect((error) => {
//     if (error) {
//         console.log('ERROR: could not connect to database: ', error.stack)
//     } else {
//         console.log('OK connected to database')
//         // execute query
//     }
// })

// DB.query('SELECT * FROM customers', (error, result) => {
//     if (error) {
//         // display error
//         console.log('ERROR in database query: ' + error.stack)
//     } else {
//         console.log(result) // the whole thing: all records + all info
//         console.log('Number of records returned:' + result.rowCount)
//         console.log(result.rows) // only the actual records returned, all records
//         console.log(result.rows[0]) // first record only
//         console.log(result.fields) // the table column metadatas
//     }
// })

// Display costumers
// const DB = require('./src/dao.js')

// app.get('/customers',
//     function (req, res) {
//         DB.connect()
//         DB.query('select * from customers',
//             function (results) {
//                 console.log(results.rowCount)
//                 res.send('Test ok')
//             }
//         )
//     }
// )

// app.get('/orders',
//     function (req, res) {
//         DB.connect()
//         DB.query('select * from orders',
//             function (results) {
//                 console.log(results.rowCount)
//                 res.send('Test orders ok')
//             }
//         )
//     }
// )

// List all customers
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

// Customer_search_form
app.post('/customer_search_form',
    function (req, res) {
        const DB = require('./src/dao')
        const numberCustomer = req.body.numberCustomer
        DB.connect()
        DB.queryParams('SELECT * from customers where customernumber =$1', [numberCustomer],
            function (customers) {
                let html = ''
                if (customers.rowCount === 1) {
                    html = 'Customer: ' + numberCustomer + '<br>'
                    html += 'Name: ' + customers.rows[0].customername + '<br>'
                    html += 'City: ' + customers.rows[0].city + '<br>'
                    html += '<br>'
                } else {
                    html = 'Customer is not exists'
                }
                // use the page template of course to display the list
                const pageData = {} // initialize empty object
                pageData.title = 'Customer Search'
                pageData.description = 'Customers search by customer number'
                pageData.author = 'Jhon Diaz'
                // send out the html table
                pageData.content = html
                res.render('master_template', pageData)
                DB.disconnect()
            }
        )
    })

// List all orders
app.get('/orders_list', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from orders', function (orders) {
        let html = ''
        html += 'Number of orders: ' + orders.rowCount + '<br>'
        html += '<table>'
        for (let i = 0; i < orders.rowCount; i++) {
            html +=
            '<tr><td>' + orders.rows[i].ordernumber +
            '</td><td>' + orders.rows[i].orderdate +
            '</td><td>' + orders.rows[i].requiredate +
            '</td><td>' + orders.rows[i].shippeddate +
            '</td><td>' + orders.rows[i].status +
            '</td><td>' + orders.rows[i].comments +
            '</td><td>' + orders.rows[i].customernumber + '</td></tr>'
        }
        html += '</table>'

        // use the page template of course to display the list
        const pageData = {} // initialize empty object
        pageData.title = 'Orders List.com'
        pageData.description = 'Orders from Classicmodels'
        pageData.author = 'Jhon Diaz'
        // send out the html table
        pageData.content = html
        response.render('master_template', pageData)
        DB.disconnect()
    })
})

// server responds with the list of customers in a JSON string
app.get('/customers', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from customers', function (customers) {
    // DB.query('SELECT customername, country, city from customers LIMIT 10', function (customers) {
        const customersJSON = { customers: customers.rows } // keep only the data records rows
        // convert JSON to JSON data string
        const customersJSONString = JSON.stringify(customersJSON, null, 4)
        // set HTTP response content type for JSON
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out the JSON data string
        response.end(customersJSONString)
    })
})

// delete one customer
// note you cannot delete customers with orders
// to know customers that don't have an order run this query
// SELECT * from customers
// LEFT JOIN orders on customers.customernumber = orders.customernumber
// WHERE ordernumber IS NULL
// ORDER BY customers.customernumber ASC
// result: you can delete customernumber 477,480,481 and others
app.delete('/customers/:id', function (request, response) {
    const id = request.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('DELETE from customers WHERE customernumber=$1', [id], function (customers) {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        // send out a string
        response.end('OK customer deleted')
    })
})

// server responds with the list of employees in a JSON string
app.get('/employees', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from employees', function (employees) {
        const employeesJSON = { employees: employees.rows } // keep only the data records rows
        // convert JSON to JSON data string
        const employeesJSONString = JSON.stringify(employeesJSON, null, 4)
        // set HTTP response content type for JSON
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out the JSON data string
        response.end(employeesJSONString)
    })
})