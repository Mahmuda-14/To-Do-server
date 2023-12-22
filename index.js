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


        // const taskSchema = {
        //     title: {
        //         type: 'string',
        //         required: true,
        //     },
        //     status: {
        //         type: 'string',
        //         enum: ['todo', 'ongoing', 'completed'],
        //         default: 'todo',
        //     },
        // };

        // // const newTask = {
        // //     title: 'Example Task',
        // //     status: 'todo',
        // // }


        // const result = await taskCollection.insertOne();
        // console.log('Inserted task with ID:', result.insertedId);

        // // Find tasks with a specific status
        // const todoTasks = await taskCollection.find({ status: 'todo' }).toArray();
        // console.log('Tasks with status "todo":', todoTasks);

        // // Update a task's status
        // const taskIdToUpdate = result.insertedId;
        // await taskCollection.updateOne({ _id: taskIdToUpdate }, { $set: { status: 'completed' } });
        // console.log('Task updated');

        // // Find all tasks
        // const allTasks = await taskCollection.find({}).toArray();
        // console.log('All tasks:', allTasks);



        // // Add this new endpoint to handle updating the task order
        // // ...

        // // Add this new endpoint to handle updating the task status when dragging between lists
        // app.put('/task/updateStatus', async (req, res) => {
        //     const { taskId, newStatus } = req.body;
          
        //         await taskCollection.updateOne({ _id: taskId }, { $set: { status: newStatus } });
        //         res.status(200).json({ message: 'Task status updated successfully' });
        //     } );

        // // ...



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
