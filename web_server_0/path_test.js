'use strict'

const path = require('path')
const filename = path.basename('/users/Refsnes/demo_path.js')
console.log(filename)

console.log(path.basename('/products/pictures/shoe.jpg'))

console.log(path.dirname('/products/pictures/shoe.jpg'))

console.log(path.extname('/products/pictures/shoe.jpg'))

console.log(path.sep)

// const pathObj = path.parse('/home/user/dir/file.txt')
// console.log(pathObj)

const assert = require('assert')
const a = 50
assert(a > 40, 'Error: ...')
assert.equal(a, 50)

// if (a <= 70) {
//     exit(1)
// }
