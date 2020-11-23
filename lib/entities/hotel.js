const Floor = require('./floor'),
enums = require('./../common/enum.json');

class Hotel{
    constructor(payload){
        this.hotel = {};
    }

    constructHotel(payload){
        let me = this;
        try{
            for(let fl of payload.floors){
                let floor = new Floor(fl)
                this.hotel[fl.name] = (floor);
            }
        }catch(e){

        }
    }

    reconcileCorridorUnitsConsumed (corridor){
        let appliances = corridor.appliances;
        corridor.unitsConsumed = 0;
        for(let applianceName of Object.keys(appliances)){
            corridor.unitsConsumed += corridor.appliances[applianceName]['units'];
        }
    }

    reconcileFloorUnitsConsumed (floor){
        let corridors = floor.corridors;
        floor.unitsConsumed = 0;
        for(let corridorID of Object.keys(corridors)){
            floor.unitsConsumed += floor.corridors[corridorID]['unitsConsumed'];
        }
    }

    turnOnLight(appliance){
        appliance.light.state = enums.possibleApplianceStates.ON;
        appliance.light.units = enums.appliances.light.units;
    }

    turnOffLight(appliance){
        appliance.light.state = enums.possibleApplianceStates.OFF;
        appliance.light.units = 0;
    }
    turnOnAC(appliance){
        appliance.AC.state = enums.possibleApplianceStates.ON;
        appliance.AC.units = enums.appliances.AC.units;
    }
    turnOffAC(appliance){
        appliance.AC.state = enums.possibleApplianceStates.OFF;
        appliance.AC.units = 0
    }
    isMaxUnitsConsumed(floor){
        return (floor.unitsConsumed + enums.appliances.light.units ) > floor.maxUnits
    }


}

module.exports = Hotel