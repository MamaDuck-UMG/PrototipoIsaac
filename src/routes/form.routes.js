const express = require('express');
const router = express.Router();

const {
	renderAddForm,
	addForm,
	renderForm,
	renderEditForm,
	editForm,
} = require('../controllers/form.controller');

router.get('/add', renderAddForm);
router.post('/add', addForm);
router.get('/', renderForm);
router.get('/edit/:cookies', renderEditForm);
router.post('/edit/:cookies', editForm);

module.exports = router;
