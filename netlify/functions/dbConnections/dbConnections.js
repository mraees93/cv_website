const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();

const dbConnectionHandler = async (event, context) => {
  try {
    const parameters = event.queryStringParameters;
    const db = (await clientPromise).db(process.env.MONGODB_DB);
    const collection = db.collection(process.env.MONGODB_COLLECTION);

    collection.insertOne(parameters);
    context.callbackWaitsForEmptyEventLoop = false;

    return {
      status: 200,
    };
  } catch (error) {
    return { status: 500, body: error.message };
  }
};

module.exports = { dbConnectionHandler };
