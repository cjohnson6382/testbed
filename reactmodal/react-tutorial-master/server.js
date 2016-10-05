var http = require('http');

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

//	app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.locals.ticketid = 1;

app.get('/api/get/:ticketid', (req, res) => {
	if (req.params.ticketid === 'new') {
		fs.readFile(path.join(__dirname, 'public/data.json'), (err, data) => {
			let tick = data.toString('utf8');

			let file = JSON.parse(tick);
			file.id = app.locals.ticketid++;

			let date = new Date();
			let datestring = date.getDay() + '-' + date.getDate() + '-' + date.getFullYear();

			file.date = datestring;
			res.json([file]);
		});
	} else {
		fs.readFile(path.join(__dirname, 'public/tickets.json'), (err, data) => {
		  const file = data.toString('utf8');
			const tick = JSON.parse(file).filter((ticket) => {
				return String(ticket.id) === req.params.ticketid;
			});
			res.json(tick);
		});
	}
	console.log('in the ticketid route', req.params.ticketid);
});

app.get('/api/tickets', (req, res) => {
  fs.readFile(path.join(__dirname, 'public/template.json'), (err, data) => {
    const template = JSON.parse(data.toString('utf8'));
		template.value[0].value.value[0].value = () => { return app.locals.ticketid++ };
    template.value[0].value.value[1].value = Date.now();

    res.json(template);
  });
});

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});


http.createServer(app).listen(80, function() {
  console.log('Server started: http://localhost:80/');
});
