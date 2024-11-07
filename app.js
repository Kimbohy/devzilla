import {createServer, get} from 'node:http'
import { userRoute, publicationRoute } from './routes/routes.js'

const server = createServer(async (req, res) => {
    // accepter les requêtes de n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*')
    // autoriser les en-têtes suivants
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    // autoriser les méthodes suivantes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    // autoriser les cookies
    res.setHeader('Access-Control-Allow-Credentials', true)
    // autoriser le cache
    res.setHeader('Cache-Control', 'no-store')

    const url = new URL(req.url, `http://${req.headers.host}`)
    await userRoute(req, res, url)
    // await publicationRoute(req, res, url)
}).listen('8080')
