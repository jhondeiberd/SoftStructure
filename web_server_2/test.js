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
// let rec = tableinfile.getRec('users.json', 101)
// assert.deepStrictEqual(rec, { id: 101, userName: 'jcote', age: 66 })
// console.log(rec)

users = tableinfile.getTable('users.json')

console.log('addRec')
const newUser = tableinfile.addRec('users.json', { id: 777, userName: 'Valery', age: 10 })
assert(users.lenght === 5)
console.log(newUser)

// tableinfile.updateRec('users.json', { id: 111, userName: 'JhonD', age: 40 })
// rec = tableinfile.getRec('users.json')
// assert.deepStrictEqual(rec, { id: 111, userName: 'JhonD', age: 40 })
// console.log(rec)
