var express = require('express');
var fs = require ( 'fs') ;
var path = require ( 'path') ;
var router = express.Router();

var accountan = path.join(process.cwd(),'./data.json')
var accounts = JSON.parse(fs.readFileSync(accountan,'utf-8'));
//var accounts = JSON.parse(fs.readFileSync('./data.json','utf-8'));

router.post('/', function handler(req, res,next) {
    try{
        var foundUser = accounts.find((data) => req.body.Password === data.pine || req.body.ParentPhoneNo === data.ParentPhoneNo);
        if (foundUser ) {
            //req.session.user = foundUser.pine;
                res.render('idcard',{Name:foundUser.Aname.Name,Mname:foundUser.Aname.Mname,Surname:foundUser.Aname.Surname,
                    NIN:foundUser.NIN,Gender:foundUser.Gender,Day:foundUser.Ddateofbirth.Day,Month:foundUser.Ddateofbirth.Month,
                    Year:foundUser.Ddateofbirth.Year,Presentclass:foundUser.Presentclass,Bloodgroup:foundUser.Bloodgroup,
                    State:foundUser.State,School:foundUser.School,HometownCommunity:foundUser.HometownCommunity,
                    ParentPhoneNo:foundUser.ParentPhoneNo,ParentPhoneNo2:foundUser.ParentPhoneNo2,Picturepath:foundUser.client,
                    Status:foundUser.Status,id:foundUser.id,Status:foundUser.Status,time:foundUser.time});
            } else {
                res.render('ddx');
            }
       
    } catch{
        res.send("Internal server error");
        
    }
});

module.exports = router;
