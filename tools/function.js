import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function getCollection(collectionName) {

    await client.connect();
    const db = client.db('devzilla');
    return db.collection(collectionName);
}

// import {MongoClient} from 'mongodb'

// const url = 'mongodb://127.0.0.1:27017'
// const dbName = 'devzilla'

// export async function getCollection(collectionName) {
//     const client = new MongoClient(url);
//     await client.connect();
//     const db = client.db(dbName);
//     return db.collection(collectionName);
// }