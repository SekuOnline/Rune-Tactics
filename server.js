var http = require('http');
var express = require('express');
var path = require('path');
var hbs = require('hbs')
//var favicon = require('serve-favicon');
const { DeckEncoder } = require('runeterra')
var app = express(); //create express middleware dispatcher
var router = express.Router();

const PORT = process.env.PORT || 3000

// view engine setup
hbs.registerPartials(__dirname + '/views/partials')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); //use hbs handlebars wrapper

app.locals.pretty = true; //to generate pretty view-source code in browser

//read routes modules
const routes = require('./routes/index');


//middleware
app.use(express.static(__dirname + '/public')) //static server
// app.use('/routes', routes);


//Routes
app.get("/", routes.index);
app.get("/LUDisplay", routes.LUDisplay)
app.get("/LUDisplay/:deck1/:deck2/:deck3", routes.LUReady);
app.get("/Lineup/:deck1/:deck2/:deck3", routes.lineup);
app.get("/GetSet/:set", routes.getSet)



//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
		console.log(`Server listening on port: ${PORT} CNTL:-C to stop`)
		console.log('http://localhost:3000/')
	}
})
