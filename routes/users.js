var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('haaaloosss');
  res.send({ id : 1, username: "hans"});
});


module.exports = router;
