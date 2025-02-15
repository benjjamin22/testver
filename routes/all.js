var express = require('express');
var router = express.Router();


router.post('/', (req, res) => {
    const  credential =  req.body.Password  === '12345' ;
    if( credential ) {
        res.render('admin');
    }
    else {
        res.render('ddx');
    }
})

module.exports = router;