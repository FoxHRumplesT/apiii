import * as user from '../modules/user/routes';
import * as allie from '../modules/allie/routes';

const express = require('express');
const router = express.Router();

// Routes from modules
router.get('/', (req, res) => {
  return res.status(200).send(`monti-api it's ok`);
})
router.use('/user', user);
router.use('/allie', allie);

module.exports = router;
