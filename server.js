const express = require('express');
const hbs = require('hbs');
var app = express();

app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getTitle',(url) => {
	var title = "Home";
	if(url == '/about'){
		title = 'About';
	}
	return title;
});

app.get('/', (req,res) => {
	// res.status(200).send('Arrived!');
	res.render('home.hbs',{url:req.url,method:req.method});
});


app.listen(3004, () => {
	console.log('this application listen to 3004');
});