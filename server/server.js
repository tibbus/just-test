"use strict"

const listenForTokens = require('./token');
const express = require('express');
const app = express();
const basicAuth = require('basic-auth-connect');

app.set('port', (process.env.PORT || 5000));

// FAKE Service APIs :
app.use('/api/v1/user/77', express.static('./fakeService/profile.json'));
app.use('/api/v1/user/77/usercar/details=true', express.static('./fakeService/userCars.json'));
app.use('/search', express.static('./fakeService/search.json'));

app.use('/callback.html', express.static('../callback.html'));

app.use(basicAuth('bizcarapp', 'meetbiz550'));

app.use('/', express.static('../dist'));

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: '../dist' });
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

// create a listener for fake Services Tokens
listenForTokens(app);
