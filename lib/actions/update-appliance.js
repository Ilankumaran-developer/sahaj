const e = require('express');
const _ = require('lodash'),
    rules = require('../../configs/rules/rules.json'),
    helper = require('../common/helper'),
    errors = require('./../common/error.json'),
    enums = require('../common/enum.json');

class UpdateAppliance {
    constructor() {
    }

    _doAction(payload, args) {
        const me = this;
        try {
            let hotel = _.cloneDeep(args);
            me._validate(hotel);
            let { floor, corridor } = helper.getFloorAndCorridor(hotel, payload)
            let devices_to_turn_on = Object.keys(rules.devices_can_be_turned_on);
            for (let device of devices_to_turn_on) {
                me.updateAppliance(corridor, device);
            }
            helper.reconcileCorridorUnitsConsumed(corridor);
            helper.reconcileFloorUnitsConsumed(floor);
            if (helper.isMaxUnitsConsumed(floor))
                return { 'nextEvent': enums.RuleEvents.ValidationFailed, 'args': args };
            else {
                args = hotel;
                return { 'nextEvent': null, 'args': args };
            }

        } catch (e) {
            throw e;
        }
    }
    updateAppliance(corridor, device) {
        const me = this;
        try {
            let allowed_corridors = rules.devices_can_be_turned_on[device]["only_on"];
            if (_.includes(allowed_corridors, _.get(corridor, 'type'))) {
                let appliances = _.filter(corridor.appliances, (appliance) => {
                    return _.isEqual(device, appliance.name) && _.isEqual(appliance.state, enums.possibleApplianceStates.OFF)
                })
                helper.updateApplianceOn(appliances)
            }
        } catch (e) {
            throw e;
        }

    }

    _validate(hotel) {
        try {
            if (_.isEmpty(hotel))
                throw new Error(JSON.stringify(errors.emptyHotel))
        } catch (e) {
            throw e;
        }

    }
}

module.exports = UpdateAppliance