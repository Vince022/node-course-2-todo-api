//const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} =require('mongodb');

let obj = new ObjectID();
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err) {
      return  console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB');

    db.collection('Todos').find();

    db.close();
});