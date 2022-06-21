const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.categoriesPath = '/api/category';
        this.productsPath = '/api/product';
        this.searchPath = '/api/search'
        this.uploadImgPath = '/api/uploadImg'

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

        // Fileupload - load files
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth.routes'));
        this.app.use( this.usersPath, require('../routes/user.routes'));
        this.app.use( this.categoriesPath, require('../routes/category.routes'));
        this.app.use( this.productsPath, require('../routes/product.routes'));
        this.app.use( this.searchPath, require('../routes/search.routes'));
        this.app.use( this.uploadImgPath, require('../routes/uploadImg.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server is running on port:', this.port );
        });
    }

}

module.exports = Server