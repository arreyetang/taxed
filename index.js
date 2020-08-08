const express = require('express');
let mysql = require('mysql');
let session = require('express-session');
let bodyParser = require('body-parser');
let validator = require('express-validator');
let path = require('path');
let app = express();
/*const cors = require('cors');*/

const connection = mysql.createConnection({
    host     : 'localhost', // MYSQL HOST NAME
    user     : 'root', // MYSQL USERNAME
    password : '', // MYSQL PASSWORD
    database : 'taxao' // MYSQL DB NAME
});
// Import routes
const authRoute = require('./server/routes/auth');
const users = require('./server/middleware/users');
const routes = require('./server/routes/auth');
const cookieParser = require('cookie-parser');

/*app.use(cors());*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(validator());
app.use(cookieParser());
app.use(express.static('UI'));
app.use(session({ secret: 'secret', saveUninitialized: false, resave: falsenp  }));
app.use('/users', authRoute);
app.use('/', routes);

app.get('/', function(request, response, _next) {
	response.sendFile(path.join(__dirname + '/UI/login.html'));
});

app.route ('/users')
.post( function(request, response, _next) {
	response.sendFile('./server/lib/db.js');
})

.get( function(request, response, _next) {
	response.sendFile('./server/lib/db.js');
});

app.route('/users/login') 
.post(function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
                console.log(username);
                console.log(password);
				request.session.loggedin = true;
				request.session.username = username;
                response.redirect('/home');
                console.log(done);
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
        });
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
})

.get(function(request, response) {
	response.sendFile(path.join(__dirname + '/UI/login.html'));
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
        console.log(done);
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

// run server
app.listen(3000, () => console.log(`Server has gone live at 3000`));
