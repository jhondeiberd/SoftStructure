/* eslint-disable no-throw-literal */
const { table } = require('console')
const fs = require('fs')

function getTable (fileName) {
    const tblString = fs.readFileSync(fileName, 'utf8')
    const tblJason = JSON.parse(tblString)
    return tblJason
}

function getRec (fileName, id) {
    const tbl = getTable(fileName)
    for (let i = 0; i < tbl.length; i++) {
        if (tbl[i].id === id) {
            return tbl[i]
        }
    }
}

function saveTable (fileName, table) {
    const tblString = JSON.stringify(table)
    fs.writeFileSync(fileName, tblString)
}

function addRec (fileName, rec) {
    const tbl = getTable(fileName)
    for (let i = 0; i < tbl.length; i++) {
        if (tbl[i].id === rec) {
            throw 'id does not existing'
        }
    }
    tbl.push(rec)
    saveTable(fileName, table)
}

function updateRec (fileName, rec) {
    const tbl = getTable(fileName)
    for (let i = 0; i < tbl.length; i++) {
        if (tbl[i].id === rec.id) {
            tbl[i] = rec
            saveTable(fileName, tbl)
        } else {
            throw 'id does not existing'
        }
    }
    tbl.push(rec)
    saveTable(fileName, table)
}

// function getTableAsync (filaName) {
//     fs.readFile(filaName, 'utf8', function(tblString){
//         const tblJSON = JSON.parse(tableString)
//         return tblJSON
//     })
// }

// Public interface of the module
module.exports = {
    getTable: getTable,
    getRec: getRec,
    saveTable: saveTable,
    addRec: addRec,
    updateRec: updateRec
}
