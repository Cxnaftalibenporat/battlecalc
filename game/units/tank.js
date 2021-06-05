const unitProperties = require("../units.json");
const properties = unitProperties["tank"];

class Tank {
    constructor(){
        this.properties = properties;
    }
}

module.exports = Tank;