exports.myHello = function () {
    return 'Hello world'
}

function myHello1 () {
    return 'Hello world1'
}

function myByeBye (a) {
    return 'Bye Bye World' + a
}

const MAX_PIC_WIDTH = 1200

const a = MAX_PIC_WIDTH / 3

exports.myHello1 = myHello1
exports.myByeBye = myByeBye
exports.MAX_PIC_WIDTH = MAX_PIC_WIDTH
exports.MPW = MAX_PIC_WIDTH
exports.a = a
