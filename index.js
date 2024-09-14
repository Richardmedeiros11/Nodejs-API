import { createServer } from "node:http"
import { index, dateJson, error } from "./controllers/routes.js";

const port = 8080


const server = createServer((req, res) => {
    switch (req.url) {
        case "/":
            index(req, res)
            break;
        case "/newJson":
            dateJson(req, res)
            break;
        default:
            error(req, res)
            break;
    }
}).listen(port)