const fs = require('fs')

function getTable (fileName) {
    const tblString = fs.readFileSync(fileName, 'utf8')
    const tblJason = JSON.parse(tblString)
    return tblJason
}

function getRec (fileName, id) {
    const table = getTable(fileName)
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === id) {
            return table[i]
        }
    }
    return {}
}

function saveTable (fileName, table) {
    const tblString = JSON.stringify(table)
    fs.writeFileSync(fileName, tblString)
}

function addRec (fileName, rec) {
    const table = getTable(fileName)
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === rec.id) {
            return false
        }
    }
    table.push(rec)
    saveTable(fileName, table)
    return true
}

function updateRec (fileName, rec) {
    const table = getTable(fileName)
    let i = 0
    while (i < table.length && table[i].id !== rec.id) {
        i++
    } if (i !== table.length) {
        table[i] = rec
        saveTable(fileName, table)
    } else {
        // throw new Error('id does not existing')
    }
}

function deleteRec (fileName, id) {
    const table = getTable(fileName)
    let i = 0
    while (i < table.length && table[i].id !== id) {
        i++
    } if (i !== table.length) {
        table.splice(i, 1)
        saveTable(fileName, table)
        return true
    } else {
        return false
    }
}

// Public interface of the module
module.exports = {
    getTable: getTable,
    getRec: getRec,
    saveTable: saveTable,
    addRec: addRec,
    updateRec: updateRec,
    deleteRec: deleteRec
}
