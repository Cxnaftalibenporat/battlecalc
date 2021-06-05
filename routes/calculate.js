var express = require('express');
var router = express.Router();
var battleCalc = require("../game/battleCalc");
var Army = require("../game/units/army");
const Infantry = require('../game/units/infantry');
const Tank = require('../game/units/tank');
const Fighter = require('../game/units/fighter');
const COMBAT_POSITION = require('../game/units/constants');
var _ = require('lodash');
var simCount = 30000;
var attackWinCount = 0;
var defendWinCount = 0;

/* POST Calculate Battle. */
router.post('/', function (req, res, next) {

    attackWinCount = 0;
    defendWinCount = 0;

    let attackers = [];
    let defenders = [];
    let data = req.body;

    for (const property in data) {
        switch (property) {
            case "Infantry":
                for (let index = 0; index < data[property][0]; index++) {
                    attackers.push(new Infantry())
                }
                for (let index = 0; index < data[property][1]; index++) {
                    defenders.push(new Infantry())
                }
                break;
            case "Tank":
                for (let index = 0; index < data[property][0]; index++) {
                    attackers.push(new Tank())
                }
                for (let index = 0; index < data[property][1]; index++) {
                    defenders.push(new Tank())
                }
                break;
            case "Fighter":
                for (let index = 0; index < data[property][0]; index++) {
                    attackers.push(new Fighter())
                }
                for (let index = 0; index < data[property][1]; index++) {
                    defenders.push(new Fighter())
                }
        }
    }

    var attackerArmy = new Army(attackers, COMBAT_POSITION.ATTACK);
    var defenderArmy = new Army(defenders, COMBAT_POSITION.DEFEND);

    //make deep clone of armies
    //pass in deep clone
    //in loop, redo the deep clone
    deepClonedAttackers = _.cloneDeep(attackerArmy);
    deepClonedDefenders = _.cloneDeep(defenderArmy);

    for (var numSimulations = simCount; numSimulations > 0; numSimulations--) {
        var battleResult = battleCalc.conductBattle([deepClonedAttackers, deepClonedDefenders]);
        if(battleResult.battleResult.victor.combatPosition === COMBAT_POSITION.ATTACK) {
            attackWinCount++;
        } else {
            defendWinCount++;
        }

        //Redo Deep Clone for each iteration
        deepClonedAttackers = _.cloneDeep(attackerArmy);
        deepClonedDefenders = _.cloneDeep(defenderArmy);
    }

    var attackerWinPercentage = ((attackWinCount / simCount) * 100).toFixed(2);
    var defenderWinPercentage = ((defendWinCount / simCount) * 100).toFixed(2);

    var winCount = {
        attackWinCount,
        defendWinCount,
        attackerWinPercentage,
        defenderWinPercentage
    }
    
    //TODO
    //run the conduct battle in 1000 iteration loop, increment simCount, increment attacker/loser count. Pass stats
    let LOGGER = battleCalc.LOGGER;

    res.render('index', { 
        title: 'Axis & Allies - Battle Calc',
        armies: battleResult.armies,
        LOGGER: LOGGER.getLog(),
        winCount: winCount

    });

});

module.exports = router;