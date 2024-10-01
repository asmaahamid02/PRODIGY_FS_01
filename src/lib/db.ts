import { MongoClient, ServerApiVersion } from 'mongodb'
import mongoose, { Connection } from 'mongoose'

//setup mongodb client
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client: MongoClient
let connection: Connection | null = null

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  client = new MongoClient(uri, options)
}

export async function connectToDB() {
  if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
      _mongoConnection?: Connection
    }

    if (!globalWithMongo._mongoConnection) {
      const conn = await mongoose.connect(process.env.MONGODB_URI as string)
      globalWithMongo._mongoConnection = conn.connection
    }

    console.log('Using existing Mongodb connection')
    connection = globalWithMongo._mongoConnection
  } else {
    try {
      const con = await mongoose.connect(process.env.MONGODB_URI as string)
      connection = con.connection

      console.log('New Mongodb connection established')

      return connection
    } catch (error) {
      console.error('Error connecting to database', error)
      throw error
    }
  }
}

export default client
