module.exports = {
	cookieUser(req, res, next) {
		var cookie = req.cookies.cookieName;
		if (cookie === undefined) {
			let randomNumber = Math.random().toString();
			randomNumber = randomNumber.substring(2, randomNumber.length);
			res.cookie('cookieName', randomNumber);
		}
		next();
	},
};
