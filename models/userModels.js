import {MongoClient, ObjectId} from 'mongodb'

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'devzilla'

async function getCollection(collectionName) {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return db.collection(collectionName);
}

export async function create(userData) {
    const newUser = {
        nom: userData.name,
        email: userData.mail,
        password: userData.password,
        type: 'Talent',
        photoProfil: '',
        description: '',
        competences: [],
        reseauxSociaux: [],
        domaines: [],
        mentorDomaineId: [],
    };

    const collection = await getCollection('Utilisateurs')
    await collection.insertOne(newUser)
    return {
        _id: newUser._id,
        name: newUser.nom,
        mail: newUser.email,
        type: newUser.type
    }
}

// fonction pour l'authentification de l'utilisateur
export async function authenticate(userData) {
    const collection = await getCollection('Utilisateurs')
    return await collection.findOne(userData, {projection: {nom: 1, email: 1}})
}

// fonction pour mettre à jour les données de l'utilisateur
export async function update(id, userData) {
    const collection = await getCollection('Utilisateurs')
    const document = await collection.findOne({_id: new ObjectId(id)})
    console.log(document)

    userData.forEach(async element => {
        if (Array.isArray(document[element.key])) {
            await collection.updateOne({_id: new ObjectId(id)},{ $push: { [element.key]: element.value } });
        } else {
            await collection.updateOne({_id: new ObjectId(id)},{ $set: { [element.key]: element.value } });
        }
    });

    return await collection.findOne({_id: new ObjectId(id)}, {projection: {password: 0}})
}