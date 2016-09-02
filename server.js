var express = require('express'); //express框架
var app = express();
var mongojs = require('mongojs');  //MongoDB API 的简单封装
var db = mongojs('contactlist', ['contactlist']); //数据库
var bodyParser = require('body-parser'); //中间件，用来解释body

/*app.get('/', function(req, res) {
	res.send('hello world form server.js');
});*/

app.use(express.static(__dirname + '/public')); //连接静态文件,HTML/CSS/JS
app.use(bodyParser.json());


app.get('/contactlist', function(req, res) { //从数据库获取
	console.log('i received a get request');

	db.contactlist.find(function(err, docs) {
		console.log(docs);
		res.json(docs); //通过get请求作出回应发回contactlist的json格式，让controller可以用
	});

	app.post('/contactlist', function(req, res) {
		console.log(req.body);
		db.contactlist.insert(req.body, function(err, doc) {
			console.log(doc);
			res.json(doc);

		})
	});

	app.delete('/contactlist/:id', function(req, res) {
		var id = req.params.id;
		console.log(id);
		db.contactlist.remove({
			_id: mongojs.ObjectId(id)
		}, function(err, doc) {
			res.json(doc);
		})
	});

	app.get('/contactlist/:id', function(req, res) {
		var id = req.params.id;
		db.contactlist.findOne({
			_id: mongojs.ObjectId(id)
		}, function(err, docs) {
			res.json(docs);
		});
	});

	app.put('/contactlist/:id', function(req, res) {
		var id = req.params.id;
		console.log(req.body.name);
		db.contactlist.findAndModify({
			query: {
				_id: mongojs.ObjectId(id)
			},
			update: {
				$set: {
					name: req.body.name,
					email: req.body.email,
					number: req.body.number
				}
			},
			new: true
		}, function(err, doc) {
			res.json(doc);
		})


	})

})

app.listen(8000);
console.log('server running on port 8000');
