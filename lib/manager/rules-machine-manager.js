const _ = require('lodash'),
    enums = require('./../common/enum.json'),
    CreateHotel = require('./../../configs/rules-machine/create-hotel.json'),
    ProcessSensor = require('./../../configs/rules-machine/process-sensor-input.json'),
    AddFloors = require('./../actions/add-floors'),
    AddCorridors = require('./../actions/add-corridors'),
    AddAppliances = require('./../actions/add-appliances'),
    PreValidate = require('./../actions/pre-validate'),
    UpdateAppliance = require('../actions/update-appliance'),
    ResetFloors = require('./../actions/reset-floors'),
    AdjustDevices = require('./../actions/adjust-devices');


class RulesMachineManager {
    constructor() {
    }
    getEvent(rule, eventName) {
        let event = _.find(rule.events, (event) => {
            return event.name == eventName
        })
        return event;
    }

    getRules(ruleMachine) {
        switch (ruleMachine) {
            case enums.RuleMachines.CreateHotel:
                return CreateHotel;
            case enums.RuleMachines.ProcessSensorInput:
                return ProcessSensor;
        }
    }

    initiateEvent(ruleMachine, eventName, payload, args) {
        const me = this;
        try {
            let rule = me.getRules(ruleMachine);
            let event = me.getEvent(rule, eventName);
            return me.executeActions(rule, event, payload, args)
        } catch (e) {
            throw e;
        }

    }

    executeActions(rule, event, payload, args) {
        const me = this;
        try {
            for (let actionObj of event.actions) {
                let nextRule = actionObj.rule_id ? me.getRules(actionObj.rule_id) : rule;
                let action = me.getActionFactory(actionObj.name);
                let result = action._doAction(payload, args);
                args = result.args;
                if (!_.isEmpty(result.nextEvent)) {
                    let nextEvent = me.getEvent(nextRule, result.nextEvent);
                    args = me.executeActions(nextRule, nextEvent, payload, args);
                }
            }
            return args;
        } catch (e) {
            throw e;
        }
    }

    getActionFactory(action) {
        try {
            switch (action) {
                case enums.ActionMap.AddFloors:
                    return new AddFloors();
                case enums.ActionMap.AddCorridors:
                    return new AddCorridors();
                case enums.ActionMap.AddAppliances:
                    return new AddAppliances();
                case enums.ActionMap.PreValidate:
                    return new PreValidate();
                case enums.ActionMap.UpdateAppliance:
                    return new UpdateAppliance();
                case enums.ActionMap.ResetFloors:
                    return new ResetFloors();
                case enums.ActionMap.AdjustDevices:
                    return new AdjustDevices();
            }
        } catch (e) {
            throw e;
        }

    }
}

module.exports = RulesMachineManager