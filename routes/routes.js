import {createUser, authenticateUser, updateUser} from '../controllers/userController.js'

export async function userRoute(req, res, url) {
    if (url.pathname === '/users/signup' && req.method === 'POST') {
        await createUser(req, res)
    } else if (url.pathname === '/users/signin' && req.method === 'POST') {
        await authenticateUser(req, res)
    } else if (url.pathname === '/users/update' && req.method === 'PUT') {
        await updateUser(req, res, url)
    } 
    else {
        res.end()
    }
}