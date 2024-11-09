import { json } from 'node:stream/consumers'
import {create, authenticate, update, getOne, getByEmail, createExt} from '../models/userModels.js'
import {CustomError} from '../tools/error.js'

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'devzilla'

export async function createUser(req, res) {
    try {
        const data = await json(req);

        const user = await create(data)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: 'Inscription réussie',
            data: user
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

export async function authenticateUser(req, res) {
    try {
        const data = await json(req);

        const user = await authenticate(data)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: 'Connexion réussie',
            data: user
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

export async function updateUser(req, res, url) {
    try {
        const data = await json(req)
        const id = url.searchParams.get('user-id')

        const user = await update(id, data)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: 'Mise à jour réussie',
            data: user
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

export async function getOneUser(req, res, url) {
    try {
        const id = url.searchParams.get('user-id')

        const user = await getOne(id)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            data: user
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

export async function getUserByEmail(req, res, url) {
    try {

        if (url.searchParams.get('status') === "1") {
            const data = {
            nom: "",
            email: url.searchParams.get('userEmail'),
            password: ""
            }

            const user = await createExt(data)
        }

        const userEmail = url.searchParams.get('userEmail')
        const user = await getByEmail(userEmail)
    
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
            success: true,
            message: "Utilisateur trouvé",
            data: user
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