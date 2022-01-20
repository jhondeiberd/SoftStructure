'use strict'

const assert = require('assert')

const tableinfile = require('./src/tableinfile')

let users = tableinfile.getTable('users.json')
console.log(users)

// const expectedUsers = [
//     {
//         id: 100,
//         userName: 'mvachon',
//         age: 12
//     },
//     {
//         id: 101,
//         userName: 'jcote',
//         age: 66
//     },
//     {
//         id: 102,
//         userName: 'pmartineau',
//         age: 99
//     }
// ]
// assert.equal(users, expectedUsers)

tableinfile.saveTable('users.json', users)

// console.log('getRec')
const rec = tableinfile.getRec('users.json', 101)
assert.deepStrictEqual(rec, { id: 101, userName: 'jcote', age: 66 })
console.log(rec)

users = tableinfile.getTable('users.json')

// tableinfile.addRec('users.json', { id: 888, userName: 'ValeryDiaz', age: 10 })
// assert(users.lenght === 5)'

// tableinfile.updateRec('users.json', { id: 888, userName: 'ValeryD', age: 11 })

tableinfile.deleteRec('users.json', 888)

// tableinfile.updateRec('users.json', { id: 111, userName: 'JhonD', age: 40 })
// rec = tableinfile.getRec('users.json')
// assert.deepStrictEqual(rec, { id: 111, userName: 'JhonD', age: 40 })
// console.log(rec)
