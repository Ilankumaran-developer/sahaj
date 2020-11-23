const _ = require('lodash'),
enums = require('./../common/enum.json'),
Corridor = require('./corridor');

class Floor{
    constructor(payload){
        this.corridors = {};
        this.name = payload.name;
        this.corridors = {};
        this.maxUnits = 0;
        this.unitsConsumed = 0;
        this.mainCorridors = [];
        this.subCorridors = [];
        this.addCorridors(payload)
    }

    addCorridors(payload){
        for(let corr of payload.corridors){
            this.corridors[corr.name] = new Corridor(corr)
            if(_.isEqual(corr.type, enums.corridor_types.MAIN)){
                this.mainCorridors.push(corr.name)
            }
            else{
                this.subCorridors.push(corr.name)
            }
            this.unitsConsumed += this.corridors[corr.name].unitsConsumed;
        }
        this.maxUnits = (this.mainCorridors.length) * 15 + (this.subCorridors.length) * 10 
    }



}

module.exports = Floor