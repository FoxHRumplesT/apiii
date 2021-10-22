import * as Controller from './controller';

const express = require('express');
const router = express.Router();

// GET SERVICES
router.get('/', Controller.GetAllies);
router.post('/', Controller.CreateAllies);

module.exports = router;
