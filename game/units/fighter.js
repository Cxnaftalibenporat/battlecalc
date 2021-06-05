const unitProperties = require("../units.json");
const properties = unitProperties["fighter"];

class Fighter {
    constructor(){
        this.properties = properties;
    }
}

module.exports = Fighter;