/**
 * Created by koyexes on 1/14/2017.
 */

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to MongoDB Server');
    }
     console.log('Connected to MongoDB Server');
    // db.collection('TodoApp').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (error, result) => {
    //    if (error) {
    //        return console.log('Unable to insert Todo', error);
    //    }
    //    console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: "Koya Gabriel",
        age: 27,
        loacation: "Lagos Nigeria"
    }, (error, result) => {
        if (error) {
            return console.log('Unable to create  Users collection');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
})