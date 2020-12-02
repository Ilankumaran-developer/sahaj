const _ = require('lodash'),
    rules = require('./../../configs/rules/rules.json'),
    helper = require('./../../lib/common/helper'),
    enums = require('./../common/enum.json');

class AddAppliances {
    constructor() {
    }

    _doAction(payload, args) {
        const me = this;
        try {
            let hotel = args;
            let appliances = rules.appliances, floorNames = Object.keys(hotel);
            let deviceNames = Object.keys(appliances);
            for (let deviceName of deviceNames) {
                for (let floorName of floorNames) {
                    let floor = hotel[floorName];
                    let corridors = floor.corridors;
                    me.addToCorridors(corridors, deviceName)
                    helper.reconcileFloorUnitsConsumed(floor)
                }
            }
            return { 'nextEvent': null, 'args': args };
        } catch (e) {
            throw e;
        }
    }

    addToCorridors(corridors, deviceName) {
        const me = this;
        try {
            for (let corridorName of Object.keys(corridors)) {
                let corridor = corridors[corridorName];
                let rule = rules.appliances[deviceName];
                for (let i = 0; i < rule[`quantity_per_${corridor.type}_corridor`]; i++) {
                    let temp = {};
                    temp.name = deviceName;
                    temp.state = rule[`default_state_in_${corridor.type}_corridor`];
                    temp.units = rule[`${temp.state}_units`];
                    corridor.appliances.push(temp)
                    corridor.unitsConsumed = parseInt(corridor.unitsConsumed) + temp.units;
                }

            }
        } catch (e) {
            throw e;
        }

    }

}

module.exports = AddAppliances;