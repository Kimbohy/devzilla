import {createServer, get} from 'node:http'
import { userRoute, publicationRoute } from './routes/routes.js'

const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    // await userRoute(req, res, url)
    await publicationRoute(req, res, url)
}).listen('8080')
