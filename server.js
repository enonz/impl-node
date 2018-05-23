const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.set('view engine','hbs');
const port = process.env.PORT || 3004;
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getTitle',(url) => {
	var title = "Home";
	if(url == '/about'){
		title = 'About';
	}
	return title;
});
hbs.registerPartials(__dirname+'/views/partials');
 // this below commented syntax doesn't call next();
	// app.use((req,res,next) => {
	// 	res.send('Sorry, the website is under maintenance.');
	// });

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = 'this happen at: '+now;
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err) => {
		if(err){
			throw console.log('unable to save log');
		}
	});
	next();
});

app.get('/', (req,res) => {
	// res.status(200).send('Arrived!');
	res.render('home.hbs',{url:req.url,method:req.method});
});


app.listen(port, () => {
	console.log('this application listen to '+port);
});