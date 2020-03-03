var express = require('express');
var router = express.Router();

/* render home page. */
router.get('/', (req, res, next) => {
  return res.render('main/home');
});

router.get('/logout', (req,res) => {
  req.logOut()
  req.session.destroy();
  return res.redirect('/');
}
);

module.exports = router;
