const pool = require('../database');
const formsCtrl = {};

formsCtrl.renderAddForm = (req, res) => {
	res.render('form/add');
};

formsCtrl.addForm = async (req, res) => {
	const cookies = req.cookies.cookieName;
	const sentForm = await pool.query(
		'SELECT * FROM history WHERE cookies = ?',
		[cookies]
	);
	if (sentForm[0] != undefined) {
		if (cookies == sentForm[0].cookies) {
			let { emergency } = req.body;

			const newForm = {
				emergency,
			};
			await pool.query('UPDATE history set ? WHERE cookies = ?', [
				newForm,
				cookies,
			]);
		}
	} else {
		let { emergency, lati, lngi } = req.body;
		const node = 1;
		if (emergency != undefined) {
			emergency = emergency.toString();
		}
		const newForm = {
			emergency,
			node,
			cookies,
			lati,
			lngi,
		};
		await pool.query('INSERT INTO history set ?', newForm);
	}

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
