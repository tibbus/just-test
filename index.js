var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/src', express.static(__dirname + '/src'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});