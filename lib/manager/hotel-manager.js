const _ = require('lodash'),
enums = require('./../common/enum.json'),
Helper = require('./../common/helper'),
Hotel = require('./../entities/hotel');

class HotelManager extends Hotel{
    constructor(dependencies){
        super(dependencies)
        this.dependencies = dependencies
    }   
    buildHotel(payload){
        this.constructHotel(payload)
        return this.hotel;
    }

    getStateOfAppliances(){
        return this.hotel;
    }
    switchONRequiredLights(corridor, potentialCorridors, floor){
        let me = this;
        if(me.isMaxUnitsConsumed(floor) && !_.isEmpty(potentialCorridors)){
            let c = potentialCorridors.pop()
            me.turnOffAC(c.appliances)
            me.reconcileCorridorUnitsConsumed(c);
            me.reconcileFloorUnitsConsumed(floor);
            me.switchONRequiredLights(corridor, potentialCorridors, floor)
        }
        else{
            me.turnOnLight(corridor.appliances);
            me.reconcileCorridorUnitsConsumed(corridor)
            me.reconcileFloorUnitsConsumed(floor)
        }
    }
    processSensorInput(payload){
        let me = this;
        if(payload.movement){
            for(let location of payload.location){
                let corridors = this.hotel[location.floor].corridors
                let floor =  this.hotel[location.floor];
                let corridorTobeUpdated = Helper.findCorridor(corridors, location.corridor);
                let potentialtoTurnoff = Helper.findPotentialCorridorToTurnOFF(corridors, location.corridor)
                me.switchONRequiredLights(corridorTobeUpdated, potentialtoTurnoff, floor)
                return me.hotel;
            }
        }else{
            for(let location of payload.location){
                let corridors = this.hotel[location.floor].corridors;
                let floor =  this.hotel[location.floor];
                for(let corridorID of Object.keys(corridors)){
                    if(_.isEqual(corridors[corridorID]['type'], enums.corridor_types.SUB )){
                        if(_.isEqual(corridors[corridorID].appliances.light.state, enums.possibleApplianceStates.ON))
                            me.turnOffLight(corridors[corridorID].appliances) 
                        if(_.isEqual(corridors[corridorID].appliances.AC.state, enums.possibleApplianceStates.OFF))
                            me.turnOnAC(corridors[corridorID].appliances)
                        me.reconcileCorridorUnitsConsumed(corridors[corridorID])
                        me.reconcileFloorUnitsConsumed(floor)
                    }
                }
                return me.hotel;
            }
        }   
    }

}


module.exports = HotelManager