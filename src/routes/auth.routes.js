const express = require('express');
const router = express.Router();

const {
	renderSignIn,
	signIn,
	logout,
} = require('../controllers/auth.controller');

// SINGIN
router.get('/signin', renderSignIn);
router.post('/signin', signIn);

router.get('/logout', logout);

module.exports = router;
