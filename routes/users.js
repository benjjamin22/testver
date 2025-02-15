var express = require('express');
var fs = require ( 'fs') ;
var path = require ( 'path') ;
var router = express.Router();


var accountan = path.join(process.cwd(),'./data.json')
var accounts = JSON.parse(fs.readFileSync(accountan,'utf-8'));
/* GET users listing. */
router.get('/', function(req, res, next) {
  const data = accounts;
  res.json(data)
});

module.exports = router;
