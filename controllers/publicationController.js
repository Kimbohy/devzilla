import {json} from 'node:stream/consumers'
import {CustomError} from '../tools/error.js'
import {create, comment, react, getOnePub, getAllPub, getOneDomainePub, getPubByDomainName} from '../models/publicationModel.js';

export async function createPublication(req, res) {
    try {
        const data = await json(req);

        const publication = await create(data)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: 'Publication réussie',
            data: publication
        }))
    } catch (error) {
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

export async function commentPublication(req, res, url) {
    try {
        const data = await json(req);
        const publicationId = url.searchParams.get('publicationId')

        const publication = await comment(publicationId, data)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: 'Commentaire réussi',
            data: publication
        }))
    } catch (error) {
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

export async function reactPublication(req, res, url) {
    try {
        const data = await json(req);
        const publicationId = url.searchParams.get('publicationId')

        const publication = await react(publicationId, data)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: 'Réaction réussie',
            data: publication
        }))
    } catch (error) {
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

export async function getPublicationByDomainName(req, res, url) {
    try {
        const domainName = url.searchParams.get('domainName');
        const publications = await getPubByDomainName(domainName);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({
            success: true,
            message: 'Publications trouvées',
            data: publications
        }));
    } catch (error) {
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
    res.end();
}

// vaovao

// export async function getOnePublication(req, res, url) {
//     const publicationId = url.searchParams.get('publicationId')

//     const publication = await getOnePub(publicationId)
//     res.writeHead(200, {'Content-Type': 'application/json'})
//     res.write(JSON.stringify({
//         success: true,
//         message: 'Publication trouvée',
//         data: publication
//     }))
//     res.end()
// }

// export async function getAllPublication(req, res) {
//     const publications = await getAllPub()
//     res.writeHead(200, {'Content-Type': 'application/json'})
//     res.write(JSON.stringify({
//         success: true,
//         message: 'Publications trouvées',
//         data: publications
//     }))
//     res.end()
// }

export async function getOneDomainePublication(req, res, url) {
    try {
        const domaineId = url.searchParams.get('domaineId')
        const publication = await getOneDomainePub(domaineName)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: 'Publications trouvées',
            data: publication
        }))
    } catch (error) {
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