const userCtrl = {};
const pool = require('../database');
const fs = require('fs');

userCtrl.renderUserProfile = async (req, res, next) => {
	const history = await pool.query('SELECT * FROM history');
	res.render('profile', { history });
	const coords = await pool.query('SELECT lati, lngi FROM history');
	var features = [];
	for (let i = 0; i < coords.length; i++) {
		if (coords[i].lati != '') {
			var feature = {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [coords[i].lngi, coords[i].lati],
				},
				properties: {
					prop0: 'value0',
				},
			};
			features.push(feature);
		}
	}
	fs.writeFileSync(
		'C:/GitHub/PrototipoIsaac/src/public/json/geojson.json',
		JSON.stringify(features, null, 3)
	);
};

module.exports = userCtrl;
