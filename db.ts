import { MongoClient } from "mongodb";


const url = "mongodb://localhost:27017"

const client = new MongoClient(url)

const db = client.db('ts')
export { db }