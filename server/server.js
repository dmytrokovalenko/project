let express = require('express');
let http = require("http");
let fs = require("fs");

let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

let tasks = [];

app.get('/', (req, res) => {

  res.send(tasks);

});

app.post('/', (req, res) => {

  tasks.push(req.body);

});

app.put('/', function(req, res) {

  let task = tasks.find(task => {
    if (task.description === req.body.oldDesc && task.date === req.body.dateCheck) {
      task.description = task.description.substring(0, task.description.indexOf('.') + 1) + ' ' + req.body.newDesc;
    }
  });

  res.send(tasks);
});

app.delete('/', function(req, res) {

  tasks.forEach(function(task, i, tasks) {
    if (req.body.oldDesc && task.date === req.body.dateCheck) {
      tasks.splice(i, 1);
    }
  })
  res.send(tasks);
});


app.listen(3333, () => console.log('API STARTED'));
