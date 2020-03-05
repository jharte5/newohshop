const express = require('express');
const router = express.Router();
const Cards = require('./users/models/Cards.json')
/* render home page. */
router.get('/', (req, res, next) => {
  let Cards = [{img, title, text}]
  return res.render('main/home',{title: 'Online shopper', Cards});
});

router.get('/logout', (req,res) => {
  req.logOut()
  req.session.destroy();
  return res.redirect('/');
}
);

module.exports = router;
