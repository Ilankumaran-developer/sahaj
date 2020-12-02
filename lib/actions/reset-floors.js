const _ = require('lodash'),
    rules = require('./../../configs/rules/rules.json'),
    helper = require('./../common/helper'),
    errors = require('./../common/error.json'),
    enums = require('./../common/enum.json');

class ResetFloors {
    constructor() {
    }

    _doAction(payload, args) {
        const me = this;
        try {
            let hotel = args, appRules = rules.appliances;
            me._validate(hotel);
            let { floor, corridor } = helper.getFloorAndCorridor(hotel, payload)
            let corridorsToReset = me._fillCorridorsToReset(floor, corridor, payload)
            for (let corr of corridorsToReset) {
                if (floor.maxUnits > floor.unitsConsumed) {
                    for (let appliance of corr.appliances) {
                        let devRule = appRules[appliance.name];
                        helper.updateAppliance(appliance, devRule[`default_state_in_${corr.type}_corridor`])
                    }
                    helper.reconcileCorridorUnitsConsumed(corr);
                    helper.reconcileFloorUnitsConsumed(floor);
                }
            }
            helper.reconcileFloorUnitsConsumed(floor);
            me._removeFromMovement(floor, payload);
            return { 'nextEvent': null, 'args': args };

        } catch (e) {
            throw e;
        }
    }

    _validate(hotel) {
        let me = this;
        try {
            if (_.isEmpty(hotel))
                throw new Error(JSON.stringify(errors.emptyHotel))
        } catch (e) {
            throw e;
        }
    }

    _fillCorridorsToReset(floor, corridor, payload) {
        let corridorInPayload = _.get(payload, 'location.corridor'), movement = floor.corridors_has_movement;
        let adjustedCorridor = movement[corridorInPayload]['adjusted'];
        let toReset = []
        toReset.push(corridor)
        toReset.push(..._.map(adjustedCorridor, (cname) => floor.corridors[cname]))
        return toReset;
    }
    _removeFromMovement(floor, payload) {
        let movement = floor.corridors_has_movement;
        let corridorInPayload = _.get(payload, 'location.corridor');
        let newMovement = {};
        _.each(movement, (corr, key) => {
            if (!_.isEqual(key, corridorInPayload))
                newMovement[key] = corr;
        })
        floor.corridors_has_movement = newMovement;
    }


}

module.exports = ResetFloors