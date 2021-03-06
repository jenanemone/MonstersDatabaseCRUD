const express = require('express');
require('dotenv').config();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;
const ejs = require('ejs');
//const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8282;
const URI = process.env.MONGODB_URI;

//templating
app.set('view engine', 'ejs');

//middlewares
//app.options('*', cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

app.get('/', function (req, res) {
    collection.find().toArray()
        .then(data => {
            res.render('index.ejs', { info: data });
        })
        .catch(error => console.error(error));

})

app.post('/addMonster', (req, res) => {
    console.log("adding a monster");
    console.log(req.body);
    
        collection.insertOne(req.body)

            .then(result => {
                console.log(result);
                res.redirect('/');

            })

            .catch(error => console.error(error));
    }
)

app.put('/updateMonster', (req, res) => {
    const query = { type: req.body.type }
    const item = {
        //type: req.body.type,
        $set: req.body
    }
    console.log("updating a monster");
    console.log(req.body);
    collection.findOneAndUpdate(query, item, { upsert: false })
        .then(result => {
            //db.close();
            console.log(result);
            //res.redirect("/");
            res.json("success");
        })
        .catch(error => {
            console.error(error)
        });
})

app.delete('/deleteMonster', (req, res) => {
    const query = { type: req.body.typeToDelete }
    console.log("deleting a monster");
    console.log(req.body);
    collection.deleteOne(query)
        .then(result => {
            //db.close();
            console.log(result);
            //res.redirect("/");
            res.json("success");
        })
        .catch(error => {
            console.error(error)
        });
})

/*
//hmm no worky
app.delete('/deleteMonster', (req,res) => {
    console.log(req.body)
    collection.deleteOne(
        {type: req.body.typeToDelete}
    )
    .then(result => {
        if (result.deletedCount === 0) {
            return res.json('Nothing to delete')
        }
        res.json('Deleted a monster')
    })
    .catch(error => console.error(error))
})
*/

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})
