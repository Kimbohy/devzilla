import {ask} from '../models/matchModel.js'
import {json} from 'node:stream/consumers'

export async function askMatch(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'})
    try {
        const data = await json(req)
        const result = await ask(data)
        res.write(JSON.stringify(result))
    } catch (err) {
        if (error instanceof CustomError) {
            res.writeHead(error.statusCode, {'Content-Type': 'application/json'})
        } else {
            res.setHeader('Content-Type', 'application/json')
        }
        res.write(JSON.stringify({
            success: false,
            message: error.message
        }))
    }
    res.end()
}