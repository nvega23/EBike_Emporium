var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('in the users routes');
  res.json({
    message: "GET /api/users"
  })
});

module.exports = router;
