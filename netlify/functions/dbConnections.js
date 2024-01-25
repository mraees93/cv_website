const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    console.log(database.collections);
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    //Add a contact

    // const newItem = {
    //   fname: "Plastic Bricks",
    //   lname: "j",
    //   subject: "nknasjnc",
    // };
    // collection.insertOne(newItem);

    // find a contact

    const results = await collection.find({}).limit(10).toArray();
    console.log(results);

    return {
      statusCode: 200,
      body: results.toString(),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
