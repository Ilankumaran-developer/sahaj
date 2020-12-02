
class Floor {
    constructor(payload) {
        this.corridors = {};
        this.name = payload.name;
        this.corridors = {};
        this.maxUnits = 0;
        this.unitsConsumed = 0;
        this.mainCorridors = [];
        this.subCorridors = [];
        this.corridors_has_movement = {};
    }
}

module.exports = Floor