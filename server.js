//Require dependencies
const express = require('express')
const app = express() 
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = 8500;
//model variable - the exported model
const TodoTask = require('./models/todotask')


//Connect to MongoDB via Mongoose
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log('Connected to db!')}
    )
    

    //Middleware
    app.set('view engine', 'ejs')   //Set view engine to ejs
    app.use(express.static('public'))  //setting up a folder to hold main.js and style etc. External files
    app.use(express.urlencoded({extended:true})) //parses urls
  

    //Tell server to serve up index.js. Using async function
    app.get("/", async (req, res) => {
        try {
            TodoTask.find({}, (err, tasks) => {
                res.render("index.ejs", { todoTasks: tasks });
            });
        } catch (err) {
            if (err) return res.status(500).send(err);
        }
    });
       


//POST to database
app.post('/', async(req,res) => {
    const todoTask = new TodoTask({
        title: req.body.title,
        content: req.body.content
    })
    try{
        await todoTask.save()
        console.log(todoTask)
        res.redirect('/')
    }catch (err){
        if (err) return res.status(500).send(err)
        res.redirect('/')
    }
})

    //PORT Creation
  app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT} `)
  })  