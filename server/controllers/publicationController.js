import {json} from 'node:stream/consumers'
import {create, comment} from '../models/publicationModel.js'

export async function createPublication(req, res) {
    const data = await json(req);

    const publication = await create(data)
    res.writeHead(201, {'Content-Type': 'application/json'})
    res.write(JSON.stringify({
        success: true,
        message: 'Publication réussie',
        data: publication
    }))
    res.end()
}

export async function commentPublication(req, res, url) {
    const data = await json(req);
    const publicationId = url.searchParams.get('publicationId')

    const publication = await comment(publicationId, data)
    res.writeHead(201, {'Content-Type': 'application/json'})
    res.write(JSON.stringify({
        success: true,
        message: 'Commentaire réussi',
        data: publication
    }))
    res.end()
}