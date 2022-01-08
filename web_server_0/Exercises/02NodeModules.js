'use strict'

const fs = require('fs')

// The synchronous version
// function CreateFolderSync (msg) {
//     if (!fs.existsSync('log')) {
//         fs.mkdirSync('log')
//         console.log('Directory created: ', 'log')
//     }
//     fs.appendFileSync('./log/server_log.log', msg + '\n')
// }

// CreateFolderSync('Hello world5')
// CreateFolderSync('Hello world6')

// The asynchronous version
function CreateFolderAsync (msg) {
    fs.access('log', function (err, stat) {
        if (err == null) {
            console.log('log folder exists')
            fs.appendFile('./log/server_log.log', msg + '\n',
                function (err) { console.log(err) }
            )
        } else {
            fs.mkdir('log',
                function (err) {
                    if (err) { throw (err) }
                    fs.appendFileSync('./log/server_log.log', msg + '\n',
                        function (err) { console.log(err) }
                    )
                }
            )
        }
    })
}

CreateFolderAsync('Hello worldA5')
CreateFolderAsync('Hello worldA6')
