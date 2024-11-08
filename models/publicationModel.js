import {ObjectId} from 'mongodb'
import {getCollection} from '../tools/function.js'

export async function create(publicationData) {
    const newPublication = {
        utilisateurId: new ObjectId(publicationData.utilisateurId),
        type: publicationData.type,
        contenu: publicationData.contenu,
        images: [],
        videos: [],
        domainesId: new ObjectId(publicationData.domainesId),
        reactions: [],
        commentaires: [],
        date: new Date()
    }

    for (const key in publicationData) {
        if (key === 'images' || key === 'videos') {
            publicationData[key].forEach(element => {
                newPublication[key].push(element)
            })
        }
    }

    const collection = await getCollection('Publications')
    await collection.insertOne(newPublication)
    return newPublication
}

export async function comment(publicationId, commentaire) {
    const collection = await getCollection('Publications')
    const newCommentaire = {
        _id: new ObjectId(),
        utilisateurId: new ObjectId(commentaire.utilisateurId),
        contenu: commentaire.contenu,
        reactions: [],
        date: new Date()
    }
    await collection.updateOne({_id: new ObjectId(publicationId)}, { $push: { commentaires: newCommentaire } })
    return await collection.findOne({_id: new ObjectId(publicationId)})
}

export async function react(publicationId, reaction) {
    const collection = await getCollection('Publications')
    const newReaction = {
        _id: new ObjectId(),
        utilisateurId: new ObjectId(reaction.utilisateurId),
        type: reaction.type,
        date: new Date()
    }
    await collection.updateOne({_id: new ObjectId(publicationId)}, { $push: { reactions: newReaction } })
    return await collection.findOne({_id: new ObjectId(publicationId)})
}

export async function getOnePub(publicationId) {
    const collection = await getCollection('Publications')
    return await collection.findOne({_id: new ObjectId(publicationId)})
}

export async function getAllPub() {
    const collection = await getCollection('Publications')
    return await collection.find().toArray()
}