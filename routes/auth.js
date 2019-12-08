var express = require('express');
var router = express.Router();
var passport = require('passport');
//require('../services/passport');

//this is the endpoint 
router.get('/google',
    // strategy is saved as 'google' in library
    passport.authenticate('google',
        // thats what we ask for (scope can be looked up)
        { scope: ['profile', 'email']}
    )
);

router.get('/google/callback',
   passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log('sucess login / signup');
        res.redirect('/');
        //res.send('Successful authentication, redirect home.');
    }
);

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource from auth');
});

router.get('/user', function(req, res){
    console.log('req.user is :' + JSON.stringify(req.user) );
    console.log('req.session is :' + JSON.stringify(req.session));
    console.log('get is in /user');
    res.send(req.user);
})

router.get('/login', function (req, res, next) {
    res.send('login unsuccessfull');
});

router.get('/logout', function (req, res, next) {
    //clears the session object
    console.log('logging out !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ')
    req.logOut();
    res.redirect('/survey');
    //res.send('logout successfull');
});

//Protect the routes now!!
function ensureAuthenticated(req, res, next) {
  //passport function 
  if (req.isAuthenticated()) {
      return next();   
  }
  res.redirect('./login');
}

router.get('/mainpage', ensureAuthenticated, function (req, res, next) {
    res.send('this is protected');
});


module.exports = router;
