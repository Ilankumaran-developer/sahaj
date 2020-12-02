const _ = require('lodash'),
    rules = require('./../../configs/rules/rules.json'),
    helper = require('./../common/helper'),
    errors = require('./../common/error.json'),
    enums = require('./../common/enum.json');

class AdjustDevices {
    constructor() {
    }

    _doAction(payload, args) {
        const me = this;
        try {
            let hotel = args;
            let { floor, corridor } = helper.getFloorAndCorridor(hotel, payload)
            let corridor_to_be_adjusted = me._findCorridorsTobeAdjusted(floor, corridor);
            me._validate(corridor_to_be_adjusted)
            for (let app of Object.keys(rules.devices_can_be_adjusted)) {
                let appliances = me._filterSuitableAppliances(corridor_to_be_adjusted, app)
                helper.updateApplianceOff(appliances)
            }
            me._addAdjustedPairs(floor, corridor, corridor_to_be_adjusted);
            helper.reconcileCorridorUnitsConsumed(corridor_to_be_adjusted);
            helper.reconcileFloorUnitsConsumed(floor);
            return { 'nextEvent': enums.RuleEvents.Movement, 'args': args };
        } catch (e) {
            throw e;
        }
    }

    _filterSuitableAppliances(corridor_to_be_adjusted, app) {
        return _.filter(corridor_to_be_adjusted.appliances, (appliance) => {
            return _.isEqual(app, appliance.name) && _.isEqual(appliance.state, enums.possibleApplianceStates.ON)
        })
    }

    _findCorridorsTobeAdjusted(floor, corridor) {
        return _.find(floor.corridors, (corr) => {
            return !_.isEqual(corr.name, corridor.name) && _.includes(rules.adjustableCorridors, corr.type) && !_.includes(Object.keys(floor.corridors_has_movement), corr.name) && !helper.isAlreadyAdjusted(corr);
        })
    }

    _addAdjustedPairs(floor, corridor, corridor_to_be_adjusted) {
        if (!floor.corridors_has_movement[corridor.name]) {
            floor.corridors_has_movement[corridor.name] = {};
            floor.corridors_has_movement[corridor.name]['adjusted'] = [corridor_to_be_adjusted.name];
        }
        else
            floor.corridors_has_movement[corridor.name]['adjusted'].push(corridor_to_be_adjusted.name)
    }

    _validate(corridor_to_be_adjusted) {
        try {
            if (_.isEmpty(corridor_to_be_adjusted))
                throw new Error(JSON.stringify(errors.CannotbeAdjusted))
        } catch (e) {
            throw e;
        }
    }
}

module.exports = AdjustDevices;