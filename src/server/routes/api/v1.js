const express      = require('express');
const router       = express.Router();
const auth         = require('../../controllers/auth');
const users        = require('../../controllers/users');

// Get root.
router.get('/', (req, res, next) => {
  res.json({ message: 'This is API version 1' });
});

router.get('/page', (req, res) => {
  setTimeout(() => {
    res.json(['List Item 1', 'List Item 2']);
  }, 1000);
});

// Allow login.
router.post('/login', auth.login);
router.post('/signup', auth.signup);

// Make sure all next routes use authentication.
router.group(router => {
  router.use(auth.authenticate);

  // Authenticated GET Requests.
  router.get('/users', users.get);

  // Authenticated POST requests.
  router.post('/users', users.create);
});

module.exports = router;
