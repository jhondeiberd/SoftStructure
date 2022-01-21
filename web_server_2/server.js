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

const tableinfile = require('./src/tableinfile')
const filaName = 'users.json'

// Get all users
app.get('/users', function (req, res) {
    const users = tableinfile.getTable(filaName)
    if (Object.keys(users).length !== 0) {
        const usersString = JSON.stringify(users)
        res.statusMessage = 'All ok' // custom error message if required
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(usersString)
    } else {
        res.statusMessage = 'No users created yet'
    }
})

// Get user by ID
app.get('/users/:id', function (req, res) {
    const user = tableinfile.getRec(filaName, Number(req.params.id))
    if (Object.keys(user).length !== 0) {
        const userString = JSON.stringify(user)
        res.statusMessage = 'All ok' // custom error message if required
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(userString)
    } else {
        res.statusMessage = 'User not found' // custom error message if required
        res.writeHead(404, { 'Content-type': 'application/json' })
        res.end()
    }
})

// add a new User
app.post('/users', function (req, res) {
    console.log(req.body)
    if (tableinfile.addRec(filaName, req.body)) {
        res.statusMessage = 'User created' // custom error message if required
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end('{}')
    } else {
        res.statusMessage = 'User alredy exist' // custom error message if required
        res.writeHead(403, { 'Content-type': 'application/json' })
        res.end('{}')
    }
})

// update a user by id
app.put('/users/:id', function (req, res) {
    console.log(req.body)
    if (tableinfile.updateRec(filaName, req.body)) {
        res.statusMessage = 'User updated' // custom error message if required
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end('{}')
    } else {
        res.statusMessage = 'User is not exist' // custom error message if required
        res.writeHead(403, { 'Content-type': 'application/json' })
        res.end('{}')
    }
})

// delete user by id
app.delete('/users/:id', function (req, res) {
    if (tableinfile.deleteRec(filaName, Number(req.params.id))) {
        res.statusMessage = 'The User was deleted' // custom error message if required
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end('{}')
    } else {
        res.statusMessage = 'User is not exist' // custom error message if required
        res.writeHead(403, { 'Content-type': 'application/json' })
        res.end('{}')
    }
})
