const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

let port = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));
app.engine('htm', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
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
