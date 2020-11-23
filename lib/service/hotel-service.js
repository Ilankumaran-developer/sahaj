const _ = require('lodash'),
enums = require('./../common/enum.json'),
Helper = require('./../common/helper'),
HotelManager = require('./../manager/hotel-manager');

class HotelService{
    constructor(dependencies){
        this.dependencies = dependencies;
        this.hotelManager = new HotelManager(dependencies);
    }
    process(req, res, method){
        let me = this, inputPayload = req.body;
        let methodName = enums.methods[method]
        try{
            Helper.schemaValidation(inputPayload, methodName)
            let payload = Helper.constructPayload(inputPayload, method);

            let result;
            switch(method){
                case enums.methods.BUILD:
                    result = me.hotelManager.buildHotel(payload)
                    break;
                case enums.methods.GETSTATE:
                    result = me.hotelManager.getStateOfAppliances(payload)
                    break;
                case enums.methods.HELLO:
                    result = me.hotelManager.helloWorld(payload)
                    break;
                case enums.methods.PROCESSSENSORINPUT:
                    result = me.hotelManager.processSensorInput(payload)
            }
            res.send(result)
        }catch(e){
            console.log('error at method', methodName, e)
            res.status(401).end(e.message) 
        }
    }   

}


module.exports = HotelService