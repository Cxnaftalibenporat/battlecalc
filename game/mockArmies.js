const Fighter = require("./units/fighter");
const Infantry = require("./units/infantry");
const Army = require("./units/army");
var COMBAT_POSITION = require("./units/constants")


var russians = [];
var americans = [];

for (let index = 0; index < 5; index++) {
    let inf = new Infantry();
    russians.push(inf);
}

for (let index = 0; index < 2; index++) {
    let inf = new Infantry();
    americans.push(inf);
}

americans.push(new Fighter())

var RussianArmy = new Army(russians, COMBAT_POSITION.ATTACK);
var AmericanArmy = new Army(americans, COMBAT_POSITION.DEFEND);

var armies = [];
armies.push(RussianArmy);
armies.push(AmericanArmy);

module.exports = armies;
