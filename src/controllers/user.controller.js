const userCtrl = {};
const pool = require('../database');

userCtrl.renderUserProfile = async (req, res, next) => {
	const history = await pool.query('SELECT * FROM history');
	res.render('profile', { history });
};

module.exports = userCtrl;
