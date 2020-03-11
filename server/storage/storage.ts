const { MongoClient } = require("mongodb");

export function Storage(mongoUrl: string, dbName: string, collectionName: string) {
  let _storage: any = null;
  if (!mongoUrl) {
    return;
  }

  (async (mongoUrl, dbName, collectionName) => {
    let client: any = null;
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (!client) {
      throw "Failed to instantiate Mongo";
    }

    console.log("Mongo started");
    try {
      const dbo = client.db(dbName);
      _storage = dbo.collection(collectionName);
    } catch (error) {
      console.log(error); // Mongo is optional
    }
  })(mongoUrl, dbName, collectionName);

  const insertPossibleMoves = (possibleMoves: any) => {
    if (_storage === null) return;
    try {
      _storage.insertOne(possibleMoves);
    } catch (error) {
      console.log("Failed to insert possible moves: ", error);
    }
  };

  const findPossibleMoves = (position: any) => {
    if (_storage === null) return;
    try {
      return _storage.findOne({ position });
    } catch (error) {
      console.log("Failed to insert possible moves: ", error);
    }
  };

  return {
    insertPossibleMoves,
    findPossibleMoves,
  };
}
