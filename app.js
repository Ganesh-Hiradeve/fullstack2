
const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
const { dirname } = require("path");
mongoose.connect('mongodb+srv://Ganesh_Hiradeve:ganesh%40123@cluster0.jj8t8qw.mongodb.net/box?retryWrites=true&w=majority', { useNewUrlParser: true });
const port = 1000;

var noteSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

var note = mongoose.model('note', noteSchema);



app.use('/assets', express.static('assets')); 

app.use(express.urlencoded())


app.set('view engine', 'html'); 
app.set(__dirname + '/index.html'); 


app.get('/', (req, res) => { 
    const params = {}
    res.sendFile(__dirname + '/index.html');
})
app.post('/note', (req, res) => {
    var myData = new note(req.body);
    myData.save().then(() => {
        res.send("Submitted Successfully")
    }).catch(() => {
        res.status(400).send("This item has not been send to the database")
    });
   
})


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})