import * as Controller from './controller';

const express = require('express');
const router = express.Router();

// GET SERVICES
router.get('/', Controller.GetUser);

module.exports = router;
