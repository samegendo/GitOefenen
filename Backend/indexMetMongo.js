const express = require("express");
const app = express();
var cors = require('cors')
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://SumayaSha:Ben12345@clustersasu.98kvr.mongodb.net/ITCase?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useUnifiedTopology: true });

(async () => {
    try {
        await client.connect();

        //const list = await client.db().admin().listDatabases();
        //console.log(list.databases);

        let database = {
            answers: [],
            managers: [],
            questions: [],
            quizmanagers: [],
            quizzes: []
        }

        let cursor = client.db('ITCase').collection('answers').find({});
        let result = await cursor.toArray();
        database.answers = result;

        cursor = client.db('ITCase').collection('managers').find({});
        result = await cursor.toArray();
        database.managers = result;

        cursor = client.db('ITCase').collection('questions').find({});
        result = await cursor.toArray();
        database.questions = result;

        cursor = client.db('ITCase').collection('quizmanagers').find({});
        result = await cursor.toArray();
        database.quizmanagers = result;

        cursor = client.db('ITCase').collection('quizzes').find({});
        result = await cursor.toArray();
        database.quizzes = result;

        app.use(cors())
        app.get("/", (req, res) => {
            res.send(database);
        })

        app.listen(3000, () => console.log("server is running..."))


    }
    catch (e) { console.log(e); }
    finally { await client.close(); }
})();







