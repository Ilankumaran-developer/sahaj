const _ = require('lodash'),
    enums = require('./../common/enum.json'),
    Helper = require('./../common/helper'),
    RulesMachineManager = require('./rules-machine-manager');

class HotelManager {
    constructor(dependencies) {
        this.hotel = {}
        this.dependencies = dependencies
        this.ruleMachineManager = new RulesMachineManager(dependencies)
    }
    constructHotel(payload) {
        let me = this;
        try {
            let result = me.ruleMachineManager.initiateEvent(enums.RuleMachines.CreateHotel, enums.RuleEvents.Start, payload, me.hotel)
            me.hotel = result;
            return me.hotel;
        } catch (e) {
            throw e;
        }
    }

    getStateOfAppliances() {
        return this.hotel;
    }

    processSensorInput(payload) {
        let me = this;
        try {
            let result = me.ruleMachineManager.initiateEvent(enums.RuleMachines.ProcessSensorInput, enums.RuleEvents.Start, payload, me.hotel)
            me.hotel = result;
            return me.hotel;
        } catch (e) {
            throw e;
        }

    }

}


module.exports = HotelManager