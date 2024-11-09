import { ObjectId } from 'mongodb'
import { getCollection } from '../tools/function.js'
import { userError } from '../tools/error.js'

export async function create(userData) {
    const newUser = {
        nom: userData.nom,
        email: userData.email,
        password: userData.password,
        type: 'Talent',
        photoProfil: '',
        description: '',
        competences: [],
        reseauxSociaux: [],
        domaines: [],
        mentor: [],
        apprenti: []
    };

    const collection = await getCollection('Utilisateurs')

    const check = await collection.findOne({email: userData.email})
    if (check) {
        throw userError.duplicateEmailError()
    } else {

        await collection.insertOne(newUser)
        return {
            _id: newUser._id,
            name: newUser.nom,
            mail: newUser.email,
            type: newUser.type
        }
    }
}


export async function authenticate(userData) {
    const collection = await getCollection('Utilisateurs')
    const check = await collection.findOne(userData, {projection: {nom: 1, email: 1, photoProfil: 1}})
    if (check) {
        return check
    } else {
        throw userError.wrongPasswordError()
    }
}

export async function update(id, userData) {
    const collection = await getCollection('Utilisateurs')
    const document = await collection.findOne({_id: new ObjectId(id)}, {projection: {password: 0}})
    if (document) {
        userData.forEach(async element => {
            if (Array.isArray(document[element.key])) {
                await collection.updateOne({_id: new ObjectId(id)},{ $push: { [element.key]: element.value } });
            } else {
                await collection.updateOne({_id: new ObjectId(id)},{ $set: { [element.key]: element.value } });
            }
        })

        return await collection.findOne({_id: new ObjectId(id)}, {projection: {password: 0}})
    } else {
        throw userError.userNotFoundError()
    }
}

export async function getOne(id) {
    const collection = await getCollection('Utilisateurs')
    const user = await collection.findOne({_id: new ObjectId(id)}, {projection: {password: 0}})
    if (user) {
        return user
    } else {
        throw userError.userNotFoundError()
    }
}

export async function getByEmail(userEmail) {
    const collection = await getCollection('Utilisateurs')
    const user = await collection.findOne({email: userEmail}, {projection: {password: 0}})
    if (user) {
        return user
    } else {
        throw userError.userNotFoundError()
    }
}