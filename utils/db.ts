import mongoose, { Connection, ConnectOptions } from 'mongoose'

interface ConnectionStatus {
  isConnected: boolean
}

const connection: ConnectionStatus = { isConnected: false }

export async function connectDb(): Promise<void> {
  if (connection.isConnected) {
    console.log('Already connected to the database')
    return
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState === 1
    if (connection.isConnected) {
      console.log('Use previous connection to the database')
      return
    }
    await mongoose.disconnect()
  }
  const db = await mongoose.connect(process.env.MONGODB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  console.log('New connection to the database')
  connection.isConnected = db.connections[0].readyState === 1
}

export async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect()
      connection.isConnected = false
    } else {
      console.log('not disconnecting from database')
    }
  }
}
const db = { connectDb, disconnectDb }
export default db
