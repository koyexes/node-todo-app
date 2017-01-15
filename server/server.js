/**
 * Created by koyexes on 1/14/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
   var todo = new Todo({
      text :  request.body.text
   });
   todo.save().then((doc) => {
      response.send(doc);
   }, (error) => {
      response.status(400).send(error);
   });
});

app.get('/todos', (request, response) => {
   Todo.find().then((todos) => {
      response.send({todos});
   }, (error) => {
      response.status(400).send(error);
   });
});

app.get('/todos/:id', (request, response) => {
   if (!ObjectID.isValid(request.params.id)) {
      return response.status(404).send();
   }
   Todo.findById(request.params.id).then((todos) => {
      if (todos) response.send({todos});
      else response.status(404).send({});
   }).catch((e) => response.status(400).send());
});

app.listen(3000, () => {
   console.log('Started on port 3000');
});

module.exports = {app};