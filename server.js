const express = require('express');
require('dotenv').config();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8282;
const URI = process.env.MONGODB_URI;

//templating
app.set('view engine','ejs');

//middlewares
app.options('*', cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

let db;
let dbName = 'monstersdb';
let collectionName = 'monstersCollection';
let collection;

MongoClient.connect(URI)
.then(client => {
    console.log("connected to database");
    db = client.db(dbName);
    collection = db.collection(collectionName);
})
.catch(error => console.error(error));

app.get('/', function(req,res) {
    collection.find().toArray()
    .then(data => {
        res.render('index.ejs',{info: data});
    })
    .catch(error => console.error(error));
    
})

app.post('/addMonster', (req,res) => {
    console.log("adding a monster");
    console.log(req.body);
    collection.insertOne(req.body)
    .then(result => {
        console.log(result);
        res.redirect('/');
    })
    .catch(error => console.error(error));
})

app.put('/updateMonster', (req,res) => {
    const type = req.body.type;
    console.log("updating a monster");
    console.log(req.body);
    collection.findOneAndUpdate({
        type: type,
        // features: req.body.features
    }, {
        $set: {features: req.body.features}
    })
    .then(result => {
        console.log(result);
        res.redirect("/");
    })
    .catch(error => console.error(error));
})

app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`);
})