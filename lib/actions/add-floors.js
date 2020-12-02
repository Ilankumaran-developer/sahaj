const _ = require('lodash'),
    enums = require('./../common/enum.json'),
    Floor = require('./../entities/floor');

class AddFloors {
    constructor() {
    }

    _doAction(payload, args) {
        if (_.isEmpty(args.hotel))
            args = {};
        try {
            for (let fl of payload.floors) {
                let floor = new Floor(fl)
                args[fl.name] = floor;
            }
            return { 'nextEvent': enums.RuleEvents.AddFloorSuccess, 'args': args }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = AddFloors