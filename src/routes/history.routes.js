const express = require('express');
const router = express.Router();

const { renderHistory } = require('../controllers/history.controller');

router.get('/history', renderHistory);

module.exports = router;
