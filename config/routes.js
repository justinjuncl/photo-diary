var posts = require('../app/controllers/posts');
var config = require('./config');

module.exports = function (app) {

	app.get('/', posts.findAll );

	app.get('/posts/:id', posts.findByID );

	app.get('/form', function (req, res) {
		if ( req.session.loggedIn ) {
			res.render('partials/form.ejs');
		} else {
			res.render('partials/auth.ejs');
		}
	});

	app.post('/posts', posts.create );

	app.post('/auth', function (req, res) {
		var password = req.body.password;

		if ( password == config.password ) {
			req.session.loggedIn = true;
			res.end("successful");
		} else {
			res.end("failed");
		}
	});

}