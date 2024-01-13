require("dotenv").config();
const exp = require('express')
const app = exp()
const {MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')
const expressAsyncHandler = require("express-async-handler");

//create server
const PORT = process.env.PORT || 3500;
app.listen(PORT,()=>console.log("Server is runnning on port 3500"))

// ONLINE DB
const MONGODB_URI = `mongodb+srv://Thoparam-Sai-nithish:nithish2003%40github@todo.etij0ji.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient (MONGODB_URI, {
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Connect to DB
client
.connect()
.then(async(dbServerRef)=>{
    const TodoDb = await dbServerRef.db('todo');
    const tasksCollection = await TodoDb.collection('tasks');
    await app.set('tasksCollection',tasksCollection);
    console.log('Database connection Success!'); 
})
.catch((err)=>{
    console.log('error in Connecting to database! : ',err) 
})

//MiddleWares
app.use(exp.json());
app.use(cors());
app.use(bodyParser.json());


//Routes
//Post request (/todoapi/post)
app.post('/todo/post',expressAsyncHandler(async(req,res)=>{
    const tasksCollection = req.app.get('tasksCollection')
    // Find the highest existing id
    const highestIdTask = await tasksCollection.findOne({}, { sort: { id: -1 } });
    // Determine the new id
    const newId = highestIdTask ? highestIdTask.id + 1 : 1;

    const taskData = {
        id :newId,
        taskName : req.body.taskName,
        taskPriority : req.body.taskPriority,
        taskStatus : req.body.taskStatus
    }

    tasksCollection.insertOne(taskData, (err, result) => {
        if (err) {
          console.log("Error is:", err);
          res.send("Failed to submit!");
        } else {
          console.log("Result is:", result);
          res.send("Successfully submitted!");
        }
      });
})) 
//Get request (/todo/get)
app.get('/todo/get', expressAsyncHandler(async(req, res) => {
    // Assuming your MongoDB collection is named tasksDataCollection
    const tasksCollection = req.app.get('tasksCollection');
    const data = await tasksCollection.find().toArray();
    res.status(200).send(data)
}));

app.delete('/todo/delete/:id', expressAsyncHandler(async(req, res) => {
    const tasksCollection = req.app.get('tasksCollection');
    const tId = +(req.params.id);

    // Assuming your MongoDB collection is named tasksDataCollection
   const result =await tasksCollection.deleteOne({id:tId})
   res.status(200).send("Ok");
}));

//UPDATE request (/todo/update)
app.put('/todo/put/:id', expressAsyncHandler(async(req, res) => {
    const tasksCollection = req.app.get('tasksCollection');
    const tId = +(req.params.id);
    const tStatus = req.body.taskStatus;
    console.log(tId);
    // console.log(tStatus)
    // Assuming your MongoDB collection is named tasksDataCollection
    const result = await tasksCollection.updateOne({id:tId},{$set:{taskStatus:tStatus}})
    res.status(200).send(result)
}));


//Build Web Packserver
const path = require('path');
app.use(exp.static(path.join(__dirname, './build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});