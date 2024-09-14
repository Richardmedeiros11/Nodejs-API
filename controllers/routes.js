import { event } from "../logs/logs.js"
const date = new Date()

const index = (req, res) => {
    if (req.method === "GET") {
        res.writeHead(200, {
            'Content-Type':'application/json'
        })
        res.write(
            JSON.stringify({ 
                "acess":"index(/)",
                "status-code":200
            })
        )
        event.emit('newLog', req.url, req.method, 200)
        console.log(`Method: ${req.method} Url: "${req.url}" StatusCode: 200 Date: ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} Hour: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
        res.end()

    } else {
        event.emit('newLog', req.url, req.method, 404)
        error(req, res)

    }
}
const dateJson = (req, res) => {
    if (req.method === "GET") {
        const date = new Date()
        let json = JSON.stringify({
            "day":date.getDate(),
            "Month":date.getMonth()+1,
            "Year":date.getFullYear(),
            "Hours":date.getHours(),
            "Minutes":date.getMinutes(),
            "Seconds":date.getSeconds(),
            "Milliseconds":date.getMilliseconds()
        })
        res.writeHead(200, {
            'Content-Type':'application/json'
        })
        event.emit('newLog', req.url, req.method, 200)
        console.log(`Method: ${req.method} Url: "${req.url}" StatusCode: 200 Date: ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} Hour: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
        res.end(json)

    } else {
        event.emit('newLog', req.url, req.method, 404)
        error(req, res)

    }
}
const error = (req, res) => {
    res.writeHead(404, {
        'Content-Type':'application/json'
    })
    console.log(`Method: ${req.method} Url: "${req.url}" StatusCode: 404 Date: ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} Hour: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    res.end(
        JSON.stringify({
            "error":404,
            "description":"Not Found"
        })
    )

}

export { index, dateJson, error }