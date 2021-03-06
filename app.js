const express = require('express');
const path = require('path'),
    bodyParser = require('body-parser'),
    http = require('http'),
    enums = require('./lib/common/enum'),
    RouteHandler = require('./lib/routes');
let app = null, routeHanlder = null;
var cors = require('cors')

class AppLoader {
    constructor() {

        this.dependencies = {}
        this.loadApp()
    }
    loadApp() {
        app = express()
        app.use(bodyParser.json({ type: 'application/json' }))
        app.use(cors())
        this.dependencies.app = app;
        routeHanlder = new RouteHandler(this.dependencies, app);
        routeHanlder.buildRoutes()
        let server = http.createServer(app)
        server.listen('8000');
        console.log('Welcome to Sahaj')
    }
}

module.exports = AppLoader