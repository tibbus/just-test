"use strict"

const stream = require('getstream');
const bodyParser = require('body-parser');

// Instantiate a new client (server side)
const client = stream.connect('8r2y2gbevg9j', 'ghdefge34a5r8ka6kyefzb7be66zrw2fybyaegu828rsf84ejk365hr6y4cmgrvq');

module.exports = app => {
    app.use(bodyParser.json());

    app.post('/api/v1/feeds/token', (req, res) => {
        let actor = req.body;
        console.log(actor);
        // creating a read-only feed token server side
        readonlyToken = client.feed(actor.actorType, actor.actorId).getReadOnlyToken();
        // passed to client via template or api and initialized as such
        let token = client.feed(actor.actorType, actor.actorId, readonlyToken).token;

        res.send( {token} );
    });

    app.use(bodyParser.json());

    app.post('/api/v1/feeds/token', (req, res) => {
        let actor = req.body;
        console.log(actor);
        // creating a read-only feed token server side
        readonlyToken = client.feed(actor.actorType, actor.actorId).getReadOnlyToken();
        // passed to client via template or api and initialized as such
        let token = client.feed(actor.actorType, actor.actorId, readonlyToken).token;

        res.send( {token} );
    });
}