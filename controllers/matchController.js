import {ask} from '../models/matchModel.js'
import {json} from 'node:stream/consumers'

export async function askMatch(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'})
    try {
        const data = await json(req)
        const result = await ask(data)
        res.write(JSON.stringify(result))
    } catch (err) {
        res.write(JSON.stringify({
            status: false,
            message: err.message
        }))
    }
    res.end()
}