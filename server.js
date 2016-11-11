"use strict"

const listenForTokens = require('./server/token');
const express = require('express');
const app = express();
const basicAuth = require('basic-auth-connect');

app.set('port', (process.env.PORT || 5000));

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/assets', express.static(__dirname + '/assets'));
// used for ts maps
app.use('/src', express.static(__dirname + '/src'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
//app.use('/api', express.static(__dirname + '/api'));
app.use('/systemjs.config.js', express.static(__dirname + '/systemjs.config.js'));
app.use('/le.min.js', express.static(__dirname + '/le.min.js'));
app.use('/oidc-client.js', express.static(__dirname + '/oidc-client.js'));

// FAKE Service APIs :    
app.use('/api/v1/user/1', express.static(__dirname + '/server/fakeService/profile.json'));
app.use('/api/v1/user/1/usercar/details=true', express.static(__dirname + '/server/fakeService/userCars.json'));
app.use('/search', express.static(__dirname + '/server/fakeService/search.json'));

app.use('/callback.html', express.static(__dirname + '/callback.html'));

app.use(basicAuth('bizcarapp', 'meetbiz550'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

// create a listener for fake Services Tokens
listenForTokens(app);
