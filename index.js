var express = require('express');
var app = express();
var basicAuth = require('basic-auth-connect');

app.set('port', (process.env.PORT || 5000));

app.use('/src', express.static(__dirname + '/src'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
//app.use('/api', express.static(__dirname + '/api'));
app.use('/systemjs.config.js', express.static(__dirname + '/systemjs.config.js'));

// FAKE Service APIs :    
app.use('/api/v1/user/1', express.static(__dirname + '/fakeService/profile.json'));
app.use('/api/v1/user/1/usercar/details=true', express.static(__dirname + '/fakeService/userCars.json'));
app.use('/api/v1/timeline/1', express.static(__dirname + '/fakeService/timeline/car1.json'));
app.use('/api/v1/timeline/11', express.static(__dirname + '/fakeService/timeline/car11.json'));
app.use('/api/v1/timeline/31', express.static(__dirname + '/fakeService/timeline/car31.json'));

app.use(basicAuth('bizcarapp', 'meetbiz550'));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});