const { MongoClient } = require('mongodb');

function Storage() {
    this.storage = null;

    newStorage = async (mongoUrl, dbName, collectionName) => {
        let client = null
        try {
            client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (error) {
            console.log("Failed to instantiate Mongo: ", error);
        }

        try {
            const dbo = client.db(dbName);
            this.storage = dbo.collection(collectionName)

        } catch (error) {
            console.log("Failed to create collection: ", error);
        }

    }

    insertPossibleMoves = async (possibleMoves) => {
        try {
            await this.storage.insertOne(possibleMoves);
        } catch (error) {
            console.log("Failed to insert possible moves: ", error);
        }
    }

    return {
        newStorage,
        insertPossibleMoves
    }
}

module.exports = Storage;
