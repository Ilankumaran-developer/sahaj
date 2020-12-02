
class Corridor {
    constructor(payload) {
        this.type = payload.type;
        this.name = payload.name;
        this.appliances = [];
        this.unitsConsumed = 0;
    }
}

module.exports = Corridor