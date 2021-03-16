const pool = require('../database');

const historyCtrl = {};

historyCtrl.renderHistory = async (req, res) => {
	const history = await pool.query('SELECT * FROM history');
	res.render('history', { history });
};

module.exports = historyCtrl;
