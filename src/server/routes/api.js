const express  = require('express');
const v1Routes = require('./api/v1');
const router   = express.Router();

router.get('/', (req, res, next) => {
  res.send('You have reached api!');
});

router.use('/v1/', v1Routes);

module.exports = router;
