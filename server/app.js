'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Api = require('./api');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const chat = require('./chat');

const baseApiMethods = new Api;
const coursesCollection = require('./coursesDB');
const authorsCollection = require('./authorsDB');
const profilesCollection = require('./profile');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(cors());


const publicRoot = process.cwd() + '/dist';
console.log(publicRoot);
app.use(express.static(publicRoot));

app.post('/api/login', baseApiMethods.checkLogin);
app.get('/api/login', baseApiMethods.logOut);

app.get('/api/courses/available', coursesCollection.getCollection);
app.get('/api/courses/subscribed', coursesCollection.getSubscribed);
app.get('/api/courses/toBeApproved', coursesCollection.getToBeApproved);
app.get('/api/courses/created', coursesCollection.getCreated);
app.get('/api/courses/:id', coursesCollection.getById);
app.post('/api/courses', coursesCollection.create);
app.put('/api/courses/:id', coursesCollection.update);
app.delete('/api/courses/:id', coursesCollection.remove);

app.post('/api/reject', coursesCollection.rejection);
app.post('/api/approve', coursesCollection.approving);
app.post('/api/subscription', coursesCollection.subscribtion);
app.get('/api/count', coursesCollection.getCount);

app.get('/api/authors', authorsCollection.getCollection);
app.post('/api/authors', authorsCollection.create);

app.get('/api/profile', profilesCollection.getProfile);
app.put('/api/profile', profilesCollection.updateProfile);



io.on('connection', chat(io));


http.listen(3123, () => {
    console.log('Express app listening on port 3123');
});


