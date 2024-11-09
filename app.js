import {createServer, get} from 'node:http'
import { userRoute, publicationRoute, matchRoute, domainRoute } from './routes/routes.js'

const server = createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Cache-Control', 'no-store')

    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
    }

    const url = new URL(req.url, `http://${req.headers.host}`)
    // await userRoute(req, res, url)
    // await publicationRoute(req, res, url)
    // await matchRoute(req, res, url)
    await domainRoute(req, res, url)
}).listen('8080')
