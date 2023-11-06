require("dotenv").config();
const exp = require('express')
const app = exp()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

//create server
const PORT = process.env.PORT || 3500;
app.listen(PORT,()=>console.log("Server is runnnign on port 3500"))
    
//connecting to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tododatabase'
});
//checking if connection is successful or not  
connection.connect((error) => {
    if (error) {
        console.log('Error connecting to database:', error);
    } else {
        console.log('Database connection successful!');
    }
});

//MiddleWares
app.use(exp.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))


//Routes
//Post request (/todoapi/post)
app.post('/todo/post',(req,res)=>{
    const id = req.body.id;
    const taskName = req.body.taskName;
    const taskPriority = req.body.taskPriority;
    const taskStatus = req.body.taskStatus;
    
    const sqlInsert = "INSERT INTO tasksdata (id, taskName,taskPriority,taskStatus) VALUES (?,?,?,?)";
    connection.query(sqlInsert,[id,taskName,taskPriority,taskStatus] , (err,result)=>{
        err&&console.log("error is :",err)
        result&&console.log("result is :", result);
        res.send("Successfully submitted!") 
    })
})
//Get request (/todo/get)
app.get('/todo/get',(req,res)=>{
    const sqlGet = 'SELECT * FROM tasksdata';
    connection.query(sqlGet,(err,result)=>{
        err&&console.log("Error is :" , err);
        result&&res.send(result)
    })
})
//DELETE request (/todo/delete)
app.delete('/todo/delete/:id',(req,res)=>{
    const id = (+req.params.id)
    console.log(id);
    const sqlDelete = 'DELETE FROM tasksdata WHERE id = ?';
    connection.query(sqlDelete,id, (err,result)=>{
        err&&console.log(err);
        res.send("Succesfully deleted")
    });
})
//UPDATE request (/todo/update)
app.put('/todo/put/:id', (req,res)=>{
    const id = (+ req.params.id)
    const taskStatus = req.body.taskStatus;
    const sqlUpdate = 'UPDATE tasksdata SET taskStatus = ? WHERE id = ?';
    connection.query(sqlUpdate , [taskStatus,id] , (err,result)=>{
        err&&console.log(err);
        res.send("Successfuly updates")
    })
} )

//Build Web Packserver
const path = require('path');
app.use(exp.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});