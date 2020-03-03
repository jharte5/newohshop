const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../lib/passport');

const userController = require('./controllers/userController');
const userValidation = require('./utils/userValidation');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/register', (req, res, next) => {
//   User.findOne({email:req.body.email}).then(user => {
//     if(user) return console.log('User Exists')
//     else {
//       const user = new User();

//       user.profile.name = req.body.name
//       user.email = req. body.email;
//       user.password = req.body.password;

//       user.save().then((user) => {
//         if (user) {
//       res.status(200).json({message: 'success', user})
//         }
//           })
//             .catch(err => {
//               return next(err);
//             })
//     }
//   })



// });
router.get('/register', (req, res) => {
  res.render('auth/register', {errors:req.flash('errors')});
});

router.post('/register', userValidation, userController.register
);
//  register route
router.get('/login', (req, res) => {
  return res.render('auth/login', {errors: req.flash('errors')});
});

// login routes
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/api/users/login',
  failureFlash: true
})
);

// profile routes
router.get('/profile', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.render('auth/profile')
  }else {
    return res.send('Unauthorized')
  }

});
module.exports = router;
