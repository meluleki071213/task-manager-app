const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const List = require('./db/models/listmodel');
const Task = require('./db/models/taskmodel');


//Load middleware
app.use(bodyParser.json());

// Route handlers

// List routes
app.get('/lists', (req, res) => {
    // We want to return an array of all the lists in the database
    List.find({}).then((lists)=>{
        res.send(lists);
        console.log("Displaying All The Lists In The Database!")
    });
});

app.post('/lists', (req, res) => {
    // We want to create a new list and return the new list  document back to the user (which includes the id)
    // The list information will be passed in via the JSON request body
    let title = req.body.title;

    let newList = new List({
        title
    });

    newList.save().then((listDoc) => {
        res.send(listDoc);
        console.log("New List Created!")
    });
});

app.patch('/lists/:id', (req, res) => {
    // We want to update the specified list with the new values specified in the JSON body of the request
    List.findByIdAndUpdate({_id: req.params.id},{
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

app.delete('/lists/:id', (req, res) => {
    // We want to delete the specified list 
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    });
});

app.get('/lists/:listId/tasks', (req, res) => {
    // We want to return all tasks that belong to a specific list (specified by listId)
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    });
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    // We want to list a specific task in a list
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    });
});

app.post('/lists/:listId/tasks', (req, res) => {
    // We want to create a new task in a list (specified by listId)
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });

    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    });
});

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // We want to update an existing task (specified by taskId)
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
});

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    // We want to delete the specified list 
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})