import {MongoClient} from 'mongodb'

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'devzilla'

export async function getCollection(collectionName) {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return db.collection(collectionName);
}