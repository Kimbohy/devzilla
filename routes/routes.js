import {createUser, authenticateUser, updateUser, getOneUser} from '../controllers/userController.js'
import {createPublication, commentPublication, reactPublication, getAllPublication, getOnePublication} from '../controllers/publicationController.js'

export async function userRoute(req, res, url) {
    if (url.pathname === '/users/signup' && req.method === 'POST') {
        await createUser(req, res)
    } else if (url.pathname === '/users/signin' && req.method === 'POST') {
        await authenticateUser(req, res)
    } else if (url.pathname === '/users/update' && req.method === 'PUT') {
        await updateUser(req, res, url)
    } else if (url.pathname === '/users' && req.method === 'GET') {
        await getOneUser(req, res, url)
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
        await getAllPublication(req, res)
    } else {
        res.end()
    }
}