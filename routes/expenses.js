var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;


var server = new Server('localhost', 27017, {auto_reconnect : true});
var db = new Db('expensedb', server);

db.open(function(err,db){
	if(!err){
		console.log('Connected to "expensedb" database');
		db.collection('expenses', {strict : true}, function(err,collection){
			if(err){
				console.log('The expenses collection does not exist, creating it');
				//populateDB();
			}
		});
	}

});

// function to populate the db with sample expenses for the 1st time
var populateDB = function (){
	var expenses = [
	{	
		name : 'Shell Gas Refill',
		amount : '$50',
		category : 'Gas/Fuel'
	},
	{	
		name : 'Safeway purchase',
		amount : '$70',
		category : 'Groceries'
	}

      ]

      db.collection('expenses', function(err, collection){
      	collection.insert(expenses, {safe : true}, function(err, result){})
      });


};

//function to find all expenses
exports.findAll =  function(req,res){
	db.collection('expenses', function(err,collection){
		collection.find().toArray(function(err, items){
			res.send(items);
		});
	});
};

//function to find a specific expense using id
exports.findById = function(req,res){
	var id = req.params.id;
	console.log('Retrieving expense: ' + id);
	db.collection('expenses', function(err, collection){
		collection.findOne({'_id' : new BSON.ObjectID(id)}, function(err, item){
			res.send(item);
		});
	});
};

//function to add an expense
exports.addExpense = function(req,res){
	var expense = req.body;
	console.log('Adding Expense' + JSON.stringify(expense));
	db.collection('expenses', function(err,collection){
		collection.insert(expense, {safe : true} , function(err, result){
			if(err){
				res.send({'error' : 'An error has occurred'});
			}
			else{
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};


//function to update an expense
exports.updateExpense = function(req,res){
	var id = req.params.id;
	console.log('Retrieving expense for Update: ' + id);
	var expense = req.body;
	console.log('Retrieving expense body: ' + expense.stringify);
	db.collection('expenses', function(err,collection){
		collection.update({'_id' : new BSON.ObjectID(id)}, expense, {safe : true}, function(err,item){
			if(err){
				res.send({'error' : 'An error has occurred'});
			}
			else{
				res.send(item);
			}
		});
	});
};


//function to delete expense
exports.deleteExpense = function(req,res){
	var id = req.params.id;
	db.collection('expenses', function(err,collection){
		collection.remove({'_id' : new BSON.ObjectID(id)}, {safe : true}, function(err,item){
			if(err){
				res.send({'error' : 'An error has occurred'});
			}
			else
			{
				res.send(req.body);
			}
		});
	});
};














