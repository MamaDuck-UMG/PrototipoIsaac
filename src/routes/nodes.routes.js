const express = require('express');
const router = express.Router();

const { renderNodes } = require('../controllers/nodes.controller');

router.get('/nodes', renderNodes);

module.exports = router;
