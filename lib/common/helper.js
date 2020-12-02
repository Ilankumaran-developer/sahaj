const _ = require('lodash'),
    schema = require('./schema'),
    errors = require('./error.json'),
    rules = require('./../../configs/rules/rules.json'),
    enums = require('./enum.json');

module.exports = {

    getFloorAndCorridor(hotel, payload) {
        let floor = hotel[_.get(payload, 'location.floor')];
        let corridor = floor.corridors[_.get(payload, 'location.corridor')];
        return { floor, corridor }
    },

    updateApplianceOn(appliances) {
        for (let appliance of appliances) {
            this.updateAppliance(appliance, enums.possibleApplianceStates.ON)
        }
    },
    updateApplianceOff(appliances) {
        for (let appliance of appliances) {
            this.updateAppliance(appliance, enums.possibleApplianceStates.OFF)
        }
    },

    isAlreadyAdjusted(corr) {
        let appliances = corr.appliances;
        let switchedOff = _.filter(appliances, (app) => { return _.isEqual(app.state, enums.possibleApplianceStates.OFF) })
        return _.isEqual(appliances.length, switchedOff.length)
    },

    updateAppliance(appliance, state) {
        let rule = rules.appliances[appliance.name];
        appliance.state = state;
        appliance.units = rule[`${state}_units`];
    },
    isMaxUnitsConsumed(floor) {
        return floor.unitsConsumed > floor.maxUnits
    },

    reconcileCorridorUnitsConsumed(corridor) {
        let appliances = corridor.appliances;
        corridor.unitsConsumed = 0;
        for (let appliance of appliances) {
            corridor.unitsConsumed += appliance['units'];
        }
    },

    reconcileFloorUnitsConsumed(floor) {
        let corridors = floor.corridors;
        floor.unitsConsumed = 0;
        for (let corridorID of Object.keys(corridors)) {
            floor.unitsConsumed += floor.corridors[corridorID]['unitsConsumed'];
        }
    },
    findCorridor: function (corridors, corridorName) {
        let corridorTobeUpdated;
        for (let corridorID of Object.keys(corridors)) {
            if (_.isEqual(corridors[corridorID]['type'], enums.corridor_types.SUB)) {
                if (_.isEqual(corridors[corridorID]['name'], corridorName)) {
                    corridorTobeUpdated = corridors[corridorID]
                }
            }
        }
        return corridorTobeUpdated
    },

    findPotentialCorridorToTurnOFF: function (corridors, corridorName) {
        let potentialtoTurnoff = [];
        for (let corridorID of Object.keys(corridors)) {
            if (_.isEqual(corridors[corridorID]['type'], enums.corridor_types.SUB)) {
                if (!_.isEqual(corridors[corridorID]['name'], corridorName)) {
                    potentialtoTurnoff.push(corridors[corridorID])
                }
            }
        }
        return potentialtoTurnoff
    },

    schemaValidation: function (inputPayload, method) {
        try {
            const options = {
                abortEarly: false, // include all errors
                allowUnknown: true, // ignore unknown props
                stripUnknown: true // remove unknown props
            };
            const { error, value } = schema[method].validate(inputPayload, options);
            if (error)
                throw new Error(JSON.stringify(errors.schemaInvalid))
        } catch (e) {
            throw e;
        }

    },
    constructPayload: function (inputPayload, method) {


        if (_.isEqual(enums.methods.BUILD, method)) {
            let payload = {};
            payload.floors = []
            for (let fcount = 1; fcount <= inputPayload.number_of_floors; fcount++) {
                let floorObject = {
                    name: `floor_${fcount}`
                }
                floorObject.corridors = [];
                for (let cCount = 1; cCount <= inputPayload.number_of_main_corridors; cCount++) {
                    let corridor = {
                        name: `main_corridor_${cCount}`
                    }

                    corridor.type = enums.corridor_types.MAIN;
                    floorObject.corridors.push(corridor)
                }
                for (let cCount = 1; cCount <= inputPayload.number_of_sub_corridors; cCount++) {
                    let corridor = {
                        name: `sub_corridor_${cCount}`
                    }
                    corridor.type = enums.corridor_types.SUB;
                    floorObject.corridors.push(corridor)
                }
                payload.floors.push(floorObject);
            }
            return payload;
        }
        else if (_.isEqual(enums.methods.PROCESSSENSORINPUT, method)) {
            return inputPayload
        }
        else {
            return {};
        }
    }
}