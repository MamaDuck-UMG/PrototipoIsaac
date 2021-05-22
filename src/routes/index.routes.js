const express = require('express');
const router = express.Router();

const { cookieUser } = require('../lib/cookies');
const { renderIndex } = require('../controllers/index.controller');

router.get('/', cookieUser, renderIndex);

module.exports = router;
