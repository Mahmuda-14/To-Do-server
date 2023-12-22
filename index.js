const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task master is running')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bcz5gxh.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    try {
        

        const taskCollection = client.db('TaskMS').collection('task');
        const userCollection = client.db('TaskMS').collection('users');

        app.get('/task', async (req, res) => {
            const result = await taskCollection.find().toArray();
            res.send(result);
        })

        app.post('/task', async (req, res) => {
            const post = req.body;
            const result = await taskCollection.insertOne(post);
            console.log(result);
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const post = req.body;
            const result = await userCollection.insertOne(post);
            console.log(result);
            res.send(result);
        })










        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Task is running on port ${port}`)
}) 
