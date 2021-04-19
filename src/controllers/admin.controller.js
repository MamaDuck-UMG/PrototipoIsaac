const adminsCtrl = {};

const pool = require('../database');
const helpers = require('../lib/helpers');
const passport = require('passport');

adminsCtrl.renderAddAdmin = (req, res) => {
	res.render('admin/add');
};

adminsCtrl.addAdmin = async (req, res) => {
	const { fullname, username, password } = req.body;
	const newAdmin = {
		fullname,
		username,
		password,
	};
	newAdmin.password = await helpers.encryptPassword(password);
	await pool.query('INSERT INTO users set ?', newAdmin);
	req.flash('success', 'Admin Saved Successfully');
	res.redirect('/admin');
};

adminsCtrl.renderAdmins = async (req, res) => {
	const admin = await pool.query('SELECT * FROM users', [req.user.id]);
	console.log(admin);
	res.render('admin/list', { admin });
};

adminsCtrl.deleteAdmin = async (req, res) => {
	const { id } = req.params;
	await pool.query('DELETE FROM users WHERE id = ?', [id]);
	req.flash('success', 'Admin Removed Successfully');
	res.redirect('/admin');
};

adminsCtrl.renderEditAdmin = async (req, res) => {
	const { id } = req.params;
	const admin = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
	console.log(admin);
	res.render('admin/edit', { admin: admin[0] });
};

adminsCtrl.editAdmin = async (req, res) => {
	const { id } = req.params;
	const { fullname, username } = req.body;
	const newAdmin = {
		fullname,
		username,
	};
	await pool.query('UPDATE users set ? WHERE id = ?', [newAdmin, id]);
	req.flash('success', 'Admin Updated Successfully');
	res.redirect('/admin');
};

adminsCtrl.renderHistory = async (req, res) => {
	const history = await pool.query('SELECT * FROM history');
	res.render('admin/history', { history });
};

adminsCtrl.renderNodes = (req, res) => {
	res.render('admin/nodes');
};

adminsCtrl.renderSignUp = (req, res) => {
	res.render('auth/signup');
};

adminsCtrl.signUp = passport.authenticate('local.signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true,
});

module.exports = adminsCtrl;
