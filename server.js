"use strict"

const listenForTokens = require('./server/token');
const express = require('express');
const app = express();
const basicAuth = require('basic-auth-connect');

app.set('port', (process.env.PORT || 5000));

// used for ts maps
//app.use('/src', express.static(__dirname + '/src'));

// FAKE Service APIs :
app.use('/api/v1/user/77', express.static(__dirname + '/server/fakeService/profile.json'));
app.use('/api/v1/user/77/usercar/details=true', express.static(__dirname + '/server/fakeService/userCars.json'));
app.use('/search', express.static(__dirname + '/server/fakeService/search.json'));

app.use('/callback.html', express.static(__dirname + '/callback.html'));

app.use(basicAuth('bizcarapp', 'meetbiz550'));

app.use('/', express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

// create a listener for fake Services Tokens
listenForTokens(app);
