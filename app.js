const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb+srv://Ganesh_Hiradeve:ganesh%40123@cluster0.jj8t8qw.mongodb.net/box?retryWrites=true&w=majority', { useNewUrlParser: true });
const port = 1000;

var noteSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

var note = mongoose.model('note', noteSchema);

// EXPRESS SPECIFIC STUFFmongod

app.use('/assets', express.static('assets')); // For serving static files
app.use(express.urlencoded())

// HTML SPECIFIC STUFF
app.set('view engine', 'html'); // Set the tamplet engine as html
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINS
app.get('/', (req, res) => { 
    const params = {}
    res.sendFile(__dirname + '/views/index.html');
})
app.post('/note', (req, res) => {
    var myData = new note(req.body);
    myData.save().then(() => {
        res.send("Submitted Successfully")
    }).catch(() => {
        res.status(400).send("This item has not been send to the database")
    });
    // res.render('home.pug');
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})