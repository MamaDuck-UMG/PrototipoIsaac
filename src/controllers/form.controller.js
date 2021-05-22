const pool = require('../database');
const formsCtrl = {};

formsCtrl.renderAddForm = (req, res) => {
	res.render('form/add');
};

formsCtrl.addForm = async (req, res) => {
	let { emergency } = req.body;
	// status = true;
	// active = status;
	const node = 1;
	const cookies = req.cookies.cookieName;
	console.log(cookies);
	if (emergency != undefined) {
		emergency = emergency.toString();
	}
	const newForm = {
		emergency,
		node,
		cookies,
		// active,
	};
	await pool.query('INSERT INTO history set ?', newForm);
	res.redirect('/form');
};

formsCtrl.renderForm = async (req, res) => {
	const cookies = req.cookies.cookieName;
	const sentForm = await pool.query(
		'SELECT * FROM history WHERE cookies = ?',
		[cookies]
	);
	res.render('form/sent', { sentForm });
};

formsCtrl.renderEditForm = async (req, res) => {
	const cookies = req.cookies.cookieName;
	const sentForm = await pool.query(
		'SELECT * FROM history WHERE cookies = ?',
		[cookies]
	);
	console.log(sentForm);
	res.render('form/edit', { sentForm: sentForm[0] });
};

formsCtrl.editForm = async (req, res) => {
	const cookies = req.cookies.cookieName;
	const cookie = await pool.query('SELECT * FROM history WHERE cookies = ?', [
		cookies,
	]);
	let { place, need, message } = req.body;
	const node = 1;
	if (need != undefined) {
		need = need.toString();
	}
	const newForm = {
		place,
		need,
		message,
		node,
	};
	await pool.query('UPDATE history set ? WHERE cookies = ?', [
		newForm,
		cookies,
	]);
	res.redirect('/form');
};

module.exports = formsCtrl;
