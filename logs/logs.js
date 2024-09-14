
import { EventEmitter } from "node:events";
const date = new Date()
import fs from "node:fs"

export const event = new EventEmitter()

event.on('newLog', async (url, method, statusCode) => {
    try{
        await new Promise((resolve, reject) => {
            let log = `Method: ${method} Url: "${url}" StatusCode: ${statusCode} Date: ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} Hour: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\n`

            fs.appendFile('file.log', log, (err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    } catch (err){
        throw err
    }
})
