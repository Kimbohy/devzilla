import {json} from 'node:stream/consumers'
import {create, getByName} from '../models/domainModel.js'

export async function createDomain(req, res) {
    try {
        const data = await json(req)

        const domain = await create(data)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: 'Création de domaine réussi',
            data: domain
        }))
    } catch (error) {
        res.writeHead(error.statusCode, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: false,
            message: error.message
        }))
    }

    res.end()
}

export async function getDomainByName(req, res, url) {
    try {
        const domainName = url.searchParams.get('domainName')
        const domain = await getByName(domainName)

        res.writeHead(201, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: "domaine trouvé",
            data: domain
        }))
    } catch (error) {
        res.writeHead(error.statusCode, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: false,
            message: error.message
        }))
    }
    res.end()
}