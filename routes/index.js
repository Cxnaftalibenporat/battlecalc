var express = require('express');
var router = express.Router();
var testing = require("../game/battleCalc");

/* GET home page. */
router.get('/', function(req, res, next) {
  var armies = [];
  let LOGGER = "";
  let winCount = {
    attackWincount: "",
    defendWincount: ""
  }
  res.render('index', {
     title: 'Axis & Allies - Battle Calc', 
     armies: armies,
     LOGGER: LOGGER,
     winCount: winCount 
    });
});

module.exports = router;
