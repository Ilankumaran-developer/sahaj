const _ = require('lodash'),
enums = require('./../common/enum.json'),
Appliance = require('./appliance');

class Corridor{
    constructor(payload){
        this.type = payload.type;
        this.name = payload.name;
        this.appliances = {};
        this.unitsConsumed = 0;
        this.addAppliances(payload);
    }

    addAppliances(payload){
        _.each(enums.appliances, (value, key)=>{
            let tempVal = _.cloneDeep(value)
            if(_.isEqual(this.type, enums.corridor_types.MAIN) || _.isEqual(tempVal.name, 'AC')){
                tempVal.defaultState = 'ON';
            }
            else{

                tempVal.defaultState = 'OFF';
                tempVal.units = 0;
            }
           
            let appliance = new Appliance(tempVal)
            this.addUnitsConsumed(appliance)
            this.appliances[appliance.name]= appliance
        })
    }

    addUnitsConsumed(value){
        if(_.isEqual(value.state, 'ON') && _.isEqual(value.name, 'light')){
            this.unitsConsumed += 5
        }
        else if(_.isEqual(value.state, 'ON') && _.isEqual(value.name, 'AC')){
            this.unitsConsumed += 10
        }
    }



}

module.exports = Corridor