import {getCollection} from '../tools/function.js'
import {domainError} from '../tools/error.js'

export async function create(data) {
    const newDomain = {
        nom : data.nom.toLowerCase(),
        description : data.description
    }

    const collection = await getCollection('Domaines')
    const check = await collection.findOne({nom: newDomain.nom})

    if (check) {
        throw domainError.duplicateDomainError()
    } else {
        await collection.insertOne(newDomain)
        return collection.findOne({nom: newDomain.nom})
    }
}

export async function getByName(domainName) {
    const collection = await getCollection('Domaines')
    const domain = await collection.findOne({nom: domainName.toLowerCase()})

    if (domain) {
        return domain
    } else {
        throw domainError.domainNotFoundError()
    }
}