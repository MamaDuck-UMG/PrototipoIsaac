const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const app = express();

require('dotenv').config();

let port = process.env.PORT || 8080;

var connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASS,
	database: process.env.DB,
});

app.use(express.json());
app.use(morgan('dev'));
app.engine('htm', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

connection.connect((err) => {
	if (!err) {
		console.log('Conected');
	} else {
		console.log('Failed');
	}
});

//CREATE
app.post('/users', (req, res, next) => {
	try {
		let user = req.body;
		let sql = `INSERT INTO user (username, password, repeat_password, email) VALUES ('${user.username}', '${user.password}', '${user.repeat_password}','${user.email}')`;
		connection.query(sql, (err, rows, fields) => {
			if (!err) {
				res.send('Created successfully');
			} else {
				console.log(err);
			}
		});
	} catch (error) {
		next(error);
	}
});

//READ
app.get('/users', (req, res, next) => {
	try {
		test = connection.query('SELECT * FROM user', (err, rows, fields) => {
			if (!err) {
				res.send(rows);
				// res.render('auth.htm');
			} else {
				console.log(err);
			}
		});
	} catch (error) {
		next(error);
	}
});

//UPDATE
app.put('/users/:username', (req, res, next) => {
	try {
		let user = req.body;
		let sql = `UPDATE user SET username = ?, password = ?, repeat_password = ?, email = ? WHERE username = '${req.params.username}'`;
		connection.query(
			sql,
			[user.username, user.password, user.repeat_password, user.email],
			(err, rows, fields) => {
				if (!err) {
					res.send('Updated successfully');
				} else {
					console.log(err);
				}
			}
		);
	} catch (error) {
		next(error);
	}
});

//DELETE
app.delete('/users/:username', (req, res, next) => {
	try {
		test = connection.query(
			'DELETE FROM user WHERE username = ?',
			[req.params.username],
			(err, rows, fields) => {
				if (!err) {
					res.send('Deleted successfully');
				} else {
					console.log(err);
				}
			}
		);
	} catch (error) {
		next(error);
	}
});

app.get('/admin', (req, res) => {
	res.render('index.htm');
});

app.get('/historial', (req, res) => {
	res.render('Historial.htm');
});

app.get('/nodos', (req, res) => {
	res.render('Nodos.htm');
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
