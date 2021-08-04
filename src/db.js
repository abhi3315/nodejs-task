const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";

const connectToDB = () =>
  mongoose.connect(
    MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log("Connected to DB");
    }
  );

let mongod;

// Memory DB setup for testing

const initializeDatabase = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const mongooseOpts = {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts);
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

module.exports = {
  initializeDatabase,
  closeDatabase,
  clearDatabase,
  connectToDB,
};
