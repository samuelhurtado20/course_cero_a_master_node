const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // body parser
        this.app.use( express.json() );

        // public folder
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.usersPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server is running on port:', this.port );
        });
    }

}

module.exports = Server