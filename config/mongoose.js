import { connect, connection } from 'mongoose';
const { config } = require('./index');

const dbName = config.DB_NAME;
const dbUser = config.DB_USER;
const dbPassword = config.DB_PASSWORD;

const DB_URI = `mongodb+srv://${dbUser}:${dbPassword}@gp-mongo.30zjx.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) return;
  const db = await connect(DB_URI);
  console.log('Connected to MongoDB');
  console.log(db.connections[0].readyState);
  conn.isConnected = db.connections[0].readyState;
  console.log(db.connection.db.databaseName);
}

connection.on('connected', () => {
  console.log('Mongoose is connected');
});

connection.on('error', (err) => {
  console.log('Mongoose connection error: ', err);
});
