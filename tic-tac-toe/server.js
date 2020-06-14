const express = require('express');
const path = require('path');
const port = 9000;
const app = express();

app.set('views', [path.join(__dirname, '/app/views')]);
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'TypeScript demo project: Tic-tac-toe game', message: 'TypeScript demo project: Tic-tac-toe game'});
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
