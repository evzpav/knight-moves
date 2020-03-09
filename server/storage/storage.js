const { MongoClient } = require("mongodb");

function Storage(mongoUrl, dbName, collectionName) {
  let _storage = null;

  (async (mongoUrl, dbName, collectionName) => {
    let client = null;
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (!client) {
      throw "Failed to instantiate Mongo";
    }

    try {
      const dbo = client.db(dbName);
      _storage = dbo.collection(collectionName);
    } catch (error) {
      console.log(error);
    }
  })(mongoUrl, dbName, collectionName);

  const insertPossibleMoves = possibleMoves => {
    try {
      _storage.insertOne(possibleMoves);
    } catch (error) {
      console.log("Failed to insert possible moves: ", error);
    }
  };

  return {
    insertPossibleMoves,
  };
}

module.exports = Storage;
