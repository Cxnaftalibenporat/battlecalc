const unitProperties = require("../units.json");
const properties = unitProperties["infantry"];

class Infantry {
    constructor(){
        this.properties = properties;
    }
}

module.exports = Infantry;