var armies = require("./mockArmies");
var roller = require("./roller");
var COMBAT_POSITION = require("./units/constants");
var CASUALTY_ORDER = require("./orderOfCasualties.json");
var LOGGER = require("./logger/globalLogger");
var COMBAT_POSITION = require("./units/constants")
var battleResult = {};

function conductBattle(armies) {
    //loop - 
    //roll each army, get num casualities
    LOGGER.log(`battle - ${armies[0].toString()}, ${armies[0].combatPosition}`);
    LOGGER.log(`${armies[1].toString()}, ${armies[1].combatPosition}`);
    LOGGER.log(`------------------`);

    while (allArmiesAlive(armies)) {
        armies = conductRound(armies);
    }

    var defender = {}
    var attacker = {}
    if (armies[0].combatPosition == COMBAT_POSITION.ATTACK) {
        attacker = armies[0];
        defender = armies[1];
    } else {
        attacker = armies[1];
        defender = armies[0];
    }

    if (defender.units.length > 0) {
        battleResult.victor = defender;
    }
    else if (defender.units.length == 0) {
        if (attacker.units.length == 0) {
            battleResult.victor = defender;
        } else {
            battleResult.victor = attacker;
        }
    }

    
    return {
        armies : armies,
        battleResult: battleResult
    } 
}

function conductRound(armies) {
    LOGGER.log(`beginning round of combat...`);
    LOGGER.log(`------------------`);


    LOGGER.log(`rolling to ${armies[0].combatPosition}`);
    let hitCountSideZero = rollArmy(armies[0]);
    LOGGER.log(`total hits: ${hitCountSideZero}`);
    LOGGER.log(`------------------`);

    LOGGER.log(`rolling to ${armies[1].combatPosition}`);
    let hitCountSideOne = rollArmy(armies[1]);
    LOGGER.log(`total hits: ${hitCountSideOne}`);
    LOGGER.log(`------------------`);

    //implement auto casualty removal process
    armies[0] = removeCasualties(armies[0], hitCountSideOne);
    armies[1] = removeCasualties(armies[1], hitCountSideZero);

    return armies;
}

function rollArmy(army) {
    let hitCount = 0;
    army.units.forEach(unit => {
        let result = roller.rollClassicDie();
        LOGGER.log(`rolled a ${result}`);
        if (hit(unit, army.combatPosition, result)) {
            LOGGER.log(`unit: ${unit.constructor.name} | combatPosition: ${army.combatPosition} -> hit scored`);
            hitCount++;
        }
        else {
            LOGGER.log(`unit: ${unit.constructor.name} | combatPosition: ${army.combatPosition} -> no hit`);
        }
        //TODO - Evaluate hit probablity and determine if a re-roll is necessary
    });
    return hitCount;
}

function allArmiesAlive(armies) {
    const armyAlive = (army) => army.units.length > 0;
    if (armies.every(armyAlive)) {
        return true;
    }
    return false;
}

function armyAlive(army) {
    return army.units.length > 0;
}

function hit(unit, combatPosition, rollResult) {
    if (combatPosition == COMBAT_POSITION.ATTACK) {
        return rollResult <= unit.properties.attack;
    } else {
        return rollResult <= unit.properties.defense;
    }
}

function removeCasualties(army, hits) {
    for (let i = hits; i > 0; i--) {

        if (removeUnit(army, CASUALTY_ORDER[0]))
            continue;
        if (removeUnit(army, CASUALTY_ORDER[1]))
            continue
        if (removeUnit(army, CASUALTY_ORDER[2]))
            continue;
    }
    return army;
}

function removeUnit(army, unitType) {
    let unitFound = (unit) => unit.properties.name == unitType;
    let foundIndex = army.units.findIndex(unitFound)
    if (foundIndex != -1) { //indicating not found
        LOGGER.log(`removed ${army.units[foundIndex].properties.name}`)
        army.units.splice(foundIndex, 1)
        return true;
    }
    return false;
}

module.exports = {
    conductBattle: conductBattle,
    LOGGER: LOGGER
}

