const _ = require('lodash'),
    enums = require('./../common/enum.json'),
    HotelService = require('./../service/hotel-service');

class RouteHandler {
    constructor(dependencies, app) {
        this.app = app;
        this.dependencies = dependencies;
        this.hotelService = new HotelService(dependencies);
    }



    buildRoutes() {
        let me = this;
        try {

            me.app.post('/v1/hotel', (req, res) => {
                me.hotelService.process(req, res, enums.methods.BUILD)
            })
            me.app.post('/v1/hotel/sensor', (req, res) => {
                me.hotelService.process(req, res, enums.methods.PROCESSSENSORINPUT)
            })
            me.app.get('/v1/hotel/getState', (req, res) => {
                me.hotelService.process(req, res, enums.methods.GETSTATE)
            })
        } catch (e) {
            throw e;
        }

    }
}

module.exports = RouteHandler