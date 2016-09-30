const listenForTokens = require('./server/token');
const express = require('express');
const app = express();
const basicAuth = require('basic-auth-connect');

app.set('port', (process.env.PORT || 5000));

app.use('/src', express.static(__dirname + '/src'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
//app.use('/api', express.static(__dirname + '/api'));
app.use('/systemjs.config.js', express.static(__dirname + '/systemjs.config.js'));
app.use('/le.min.js', express.static(__dirname + '/le.min.js'));

// FAKE Service APIs :    
app.use('/api/v1/user/1', express.static(__dirname + '/server/fakeService/profile.json'));
app.use('/api/v1/user/1/usercar/details=true', express.static(__dirname + '/server/fakeService/userCars.json'));
app.use('/search', express.static(__dirname + '/server/fakeService/search.json'));

app.use(basicAuth('bizcarapp', 'meetbiz550'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

// create a listener for fake Services Tokens
listenForTokens(app);
