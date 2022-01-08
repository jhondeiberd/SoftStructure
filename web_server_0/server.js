'use strict'

// console.log('NodeJs Interpreter starts executing Javascript code')

// function add (a, b) {
//     return a + b
// }

// const val1 = 2
// const val2 = 6
// const result = add(val1, val2)
// console.log('Hello Worldddd')
// console.log('Add function result: ' + result)

// console.log(myMod.myHello())
// console.log(myMod.myHello1())
// console.log(myMod.myByeBye())
// console.log(myMod.MAX_PIC_WIDTH)
// console.log(myMod.MPW)
// console.log(myMod.a)

const myMod = require('./src/myfirstmodule/index.js')
console.log(myMod.myHello())
console.log(myMod.myHello1())
console.log(myMod.myByeBye())
console.log(myMod.MAX_PIC_WIDTH)
console.log(myMod.MPW)
console.log(myMod.a)
