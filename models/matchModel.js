import {ObjectId} from 'mongodb'
import {getCollection} from '../tools/function.js'
import {matchError} from '../tools/error.js'

export async function ask(data) {
    const collection = await getCollection('Matchs')
    const newMatching = {
        talentId: new ObjectId(data.talentId),
        mentorId: new ObjectId(data.mentorId),
        domaineId: new ObjectId(data.domaineId),
        status: 'pending',
        source: data.source,
        date: new Date()
    }
    
    const check = await collection.findOne({talentId: new ObjectId(data.talentId), mentorId: new ObjectId(data.mentorId), domaineId: new ObjectId(data.domaineId)})

    if (check) {
        if(check.status === 'pending' && check.source !== newMatching.source) {
            await collection.updateOne({_id: check._id}, { $set: {status: 'matched'}})

            const collectionUsers = await getCollection('Utilisateurs')
            await collectionUsers.updateOne({_id: new ObjectId(data.talentId)}, { $push: {mentor: new ObjectId(data.mentorId), domaine: new ObjectId(data.domaineId) } })
            await collectionUsers.updateOne({_id: new ObjectId(data.mentorId)}, { $push: {apprenti: new ObjectId(data.talentId), domaine: new ObjectId(data.domaineId) } })

            return {
                status: true,
                message: 'Match trouvé'
            }
        } else if (check.status === 'pending' && check.source === newMatching.source) {
            throw matchError.duplicateRequestError()
        } else if (check.status !== 'pending' && check.source === 'talent') {
            throw matchError.alreadyMatchedError()
        }
    } else {
        await collection.insertOne(newMatching)
        return {
            status: true,
            message: 'Demande envoyée'
        }
    }

    return data
}