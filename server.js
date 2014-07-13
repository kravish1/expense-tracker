var express = require('express');
var expenses = require('./routes/expenses');

var app = express();

// App Configuration
app.configure(function () {
    app.use(express.static(__dirname + './public'));
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

//RESTful API's
app.get('/expenses', expenses.findAll);
app.get('/expenses/:id', expenses.findById);
app.post('/expenses', expenses.addExpense);
app.put('/expenses/:id', expenses.updateExpense);
app.delete('/expenses/:id', expenses.deleteExpense);

//code to load index.html
app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});


app.listen(3000);
console.log('Listening on port 3000');