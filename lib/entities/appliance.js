class Appliance {
    constructor(payload) {
        this.name = payload.name;
        this.state = payload.defaultState;
        this.units = payload.units;
    }
}

module.exports = Appliance;