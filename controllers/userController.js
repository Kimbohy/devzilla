import { json } from 'node:stream/consumers'
import {create, authenticate, update} from '../models/userModels.js';

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'devzilla'

export async function createUser(req, res) {
    const data = await json(req);

    const user = await create(data)
    res.writeHead(201, {'Content-Type': 'application/json'})
    res.write(JSON.stringify({
        success: true,
        message: 'Inscription réussie',
        data: user
    }))
    res.end()
}

export async function authenticateUser(req, res) {
    const data = await json(req);

    const user = await authenticate(data)
    // si l'utilisateur existe
    if (user) {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: 'Connexion réussie',
            data: user
        }))
    } else {
        res.writeHead(401, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: false,
            message: 'Email ou mot de passe incorrect'
        }))
    }
    res.end()
}

export async function updateUser(req, res, url) {
    const data = await json(req)
    const id = url.searchParams.get('user-id')

    const user = await update(id, data)
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write(JSON.stringify({
        success: true,
        message: 'Mise à jour réussie',
        data: user
    }))
    res.end()
}