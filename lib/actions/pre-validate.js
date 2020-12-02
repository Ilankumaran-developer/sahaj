const e = require('express');
const _ = require('lodash'),
    enums = require('./../common/enum.json');

class PreValidate {
    constructor() {
    }

    _doAction(payload, args) {
        try {
            if (_.get(payload, 'movement'))
                return { 'nextEvent': enums.RuleEvents.Movement, 'args': args };
            else
                return { 'nextEvent': enums.RuleEvents.Nomovement, 'args': args };
        } catch (e) {
            throw e;
        }
    }
}

module.exports = PreValidate;