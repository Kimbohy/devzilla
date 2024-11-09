import {createUser, authenticateUser, updateUser, getOneUser, getUserByEmail} from '../controllers/userController.js'
import {createPublication, commentPublication, reactPublication, getOneDomainePublication} from '../controllers/publicationController.js'
import {askMatch} from '../controllers/matchController.js'
import {createDomain, getDomainByName} from '../controllers/domainController.js'

export async function userRoute(req, res, url) {
    if (url.pathname === '/users/signup' && req.method === 'POST') {
        await createUser(req, res)
    } else if (url.pathname === '/users/signin' && req.method === 'POST') {
        await authenticateUser(req, res)
    } else if (url.pathname === '/users/update' && req.method === 'PUT') {
        await updateUser(req, res, url)
    } else if (url.pathname === '/users' && req.method === 'GET') {
        if (url.searchParams.get('user-id')) {
            await getOneUser(req, res, url)
        } else if (url.searchParams.get('userEmail')) {
            await getUserByEmail(req, res, url)
        }
    } else {
        res.end()
    }
}

export async function publicationRoute(req, res, url) {
    if (url.pathname === '/publications/create' && req.method === 'POST') {
        await createPublication(req, res)
    } else if (url.pathname === '/publications/comment' && req.method === 'POST') {
        await commentPublication(req, res, url)
    } else if (url.pathname === '/publications/react' && req.method === 'POST') {
        await reactPublication(req, res, url)
    } else if (url.pathname === '/publications' && req.method === 'GET') {
        await getOneDomainePublication(req, res, url)
    } else {
        res.end()
    }
}

// fonction pour les routes de match
export async function matchRoute(req, res, url) {
    if (url.pathname === '/matchs/ask' && req.method === 'POST') {
        await askMatch(req, res)
    } else {
        res.end()
    }
}

export async function domainRoute(req, res, url) {
    if (url.pathname === '/domains/create' && req.method === 'POST') {
        await createDomain(req, res)
    } else if (url.pathname === '/domains' && req.method === 'GET') {
        await getDomainByName(req, res, url)
    }
    else {
        res.end()
    }
}