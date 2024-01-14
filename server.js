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
    tlsAllowInvalidCertificates: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Connect to DB
client
.connect()
.then(async(dbServerRef)=>{
    const TodoDb = await dbServerRef.db('todo');
    const tasksCollection = await TodoDb.collection('tasks');
    const accountsCollection = await TodoDb.collection('accounts');
    const securityKeysCollection = await TodoDb.collection('securityKeys')
    await app.set('tasksCollection',tasksCollection);
    await app.set('accountsCollection',accountsCollection);
    await app.set('securityKeysCollection',securityKeysCollection);
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
const accountsApp = require('./APIs/AccountsApi')
app.use('/accounts',accountsApp)
//Post request (/todoapi/post)
app.post('/todo/post',expressAsyncHandler(async(req,res)=>{
    const tasksCollection = req.app.get('tasksCollection')
    // Find the highest existing id
    const highestIdTask = await tasksCollection.findOne({userEmail:req.body.userEmail}, { sort: { id: -1 } });
    // Determine the new id
    const newId = highestIdTask ? highestIdTask.id + 1 : 1;

    const taskData = {
        id :newId,
        taskName : req.body.taskName,
        taskPriority : req.body.taskPriority,
        taskStatus : req.body.taskStatus,
        userEmail:req.body.userEmail
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
app.post('/todo/get', expressAsyncHandler(async(req, res) => {
    // Assuming your MongoDB collection is named tasksDataCollection
    const userData = req.body
    // console.log('user Data (todo/get) : ', userData)
    const tasksCollection = req.app.get('tasksCollection');
    const data = await tasksCollection.find({userEmail:userData.userEmail}).toArray();
    res.status(200).send(data)
}));

app.post('/todo/delete/:id', expressAsyncHandler(async(req, res) => {
    const tasksCollection = req.app.get('tasksCollection');
    const tId = +(req.params.id);

    // Assuming your MongoDB collection is named tasksDataCollection
   const result =await tasksCollection.deleteOne({id:tId, userEmail:req.body.userEmail})
   res.status(200).send("Ok");
}));

//UPDATE request (/todo/update)
app.put('/todo/put/:id', expressAsyncHandler(async(req, res) => {
    const tasksCollection = req.app.get('tasksCollection');
    const tId = +(req.params.id);
    const tStatus = req.body.taskStatus;
    const tUserEmail = req.body.userEmail;
    // console.log(tId);
    // console.log(tStatus)
    // Assuming your MongoDB collection is named tasksDataCollection
    const result = await tasksCollection.updateOne({id:tId, userEmail: tUserEmail },{$set:{taskStatus:tStatus}})
    res.status(200).send(result)
}));


//Build Web Packserver
const path = require('path');
app.use(exp.static(path.join(__dirname, './build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});