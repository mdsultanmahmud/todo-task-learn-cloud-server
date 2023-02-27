const express = require("express")
const app = express()
const port = 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
// password: 3PSQHEdeb_s$#SB
// username: TodoApp




const uri = "mongodb+srv://TodoApp:3PSQHEdeb_s$#SB@cluster0.p11nzlu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

    }
    catch {

    }
}

run.catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello, task server is running from')
})

app.listen(port, () => {
    console.log('server is running from port: ', port)
})