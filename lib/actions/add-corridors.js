const _ = require('lodash'),
    Corridor = require('./../entities/corridor'),
    enums = require('./../common/enum.json');

class AddCorridors {
    constructor() {
    }

    _doAction(payload, args) {
        try {
            let hotel = args;
            for (let floorName of Object.keys(hotel)) {
                let floor = hotel[floorName];
                let fpayload = _.find(payload.floors, (f) => {
                    return f.name == floorName;
                })
                for (let corr of fpayload.corridors) {
                    floor.corridors[corr.name] = new Corridor(corr)
                    if (_.isEqual(corr.type, enums.corridor_types.MAIN)) {
                        floor.mainCorridors.push(corr.name)
                    }
                    else {
                        floor.subCorridors.push(corr.name)
                    }
                }
                floor.maxUnits = (floor.mainCorridors.length) * 15 + (floor.subCorridors.length) * 10
            }

            return { 'nextEvent': enums.RuleEvents.AddCorridorsSuccess, 'args': args };
        } catch (e) {
            throw e;
        }

    }
}

module.exports = AddCorridors