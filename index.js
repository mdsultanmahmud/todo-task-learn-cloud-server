const express = require("express")
const app = express()
const cors = require('cors')
const port = 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// password: 3PSQHEdeb_s$#SB
// username: TodoApp

// middleware 
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://Task_Manager:l22nvLd0mbIff8Ij@cluster0.p11nzlu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const TodoApp = client.db('TodoApp').collection('todo_tasks')
        app.post('/addtask', async (req, res) => {
            const task = req.body
            const result = await TodoApp.insertOne(task)
            res.send(result)
        })

        app.get('/getAllTask', async (req, res) => {
            const tasks = await TodoApp.find({}).toArray()
            res.send(tasks)
        })
        app.delete('/deleteTask/:id', async(req, res) => {
            const id = req.params.id
            const filter = {
                _id: new ObjectId(id)
            }
            const result = await TodoApp.deleteOne(filter)
            res.send(result)
        })

        // updateIsdone task 
        app.patch('/donetask/:id', async(req, res) =>{
            const id = req.params.id 
            const filter = {
                _id :new ObjectId(id)
            }
            const option = {upsert: true}
            const updateTask = {
                $set:{
                    isDone: true
                }
            }
            const result = await TodoApp.updateOne(filter, updateTask, option)
            res.send(result)
        })
    }
    catch {

    }
}

run().catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello, task server is running from')
})

app.listen(port, () => {
    console.log('server is running from port: ', port)
})