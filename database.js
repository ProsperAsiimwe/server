const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

let mongo;

const startDatabase = async () => {
  try {
    mongo = await MongoMemoryServer.create();

    const uri = mongo.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, mongooseOpts);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 */
const stopDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
    console.log("Database connection closed");
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { startDatabase, stopDatabase };
