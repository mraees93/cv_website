const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();

const handler = async (event, context) => {
  try {
    const params = event.queryStringParameters;
    const database = (await clientPromise).db(process.env.MONGODB_DB);
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    collection.insertOne(params);
    context.callbackWaitsForEmptyEventLoop = false;

    return {
      statusCode: 200,
    };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};

module.exports = { handler };
