const { urlencoded } = require('express');
const express = require('express');
const port = 8009;
const server = express();
const path = require('path');
const db = require('./config/mongoose');
const todo = require('./models/todo')

server.use(express.static('assets'));
server.use(urlencoded());

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.get('/', function (req, res) {
    todo.find({}, function (err, data) {
        res.render('index', {
            'title': 'todoList',
            'data': data
        })
    })
})

server.post('/addData', function (req, res) {
    todo.create({
        description: req.body.description,
    }, function (err, data) {
        if (err) {
            console.log("only true value added");
            return false
        }
        return res.redirect('/');
    })
})

server.get('/deleteData/:id', function (req, res) {
    var todo_id = req.params.id;
    todo.findByIdAndDelete(todo_id, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
})

server.get('/updateData/:id', function (req, res) {
    var todo_id = req.params.id;
    todo.findById(todo_id, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        return res.render('update_todo', {
            'single': data
        })
    })
})

server.post('/insertData', function (req, res) {
    var todo_id = req.body.id;
    todo.findByIdAndUpdate(todo_id, {
        'description': req.body.description
    }, function(err){
        if(err){
            console.log(err);
            return false;
        }
    })
    return res.redirect('/');
})

server.listen(port, function (err) {
    if (err) {
        console.log("Server Is In Error" + err);
        return false
    }
    console.log("Server Is On Port=" + port);
})
