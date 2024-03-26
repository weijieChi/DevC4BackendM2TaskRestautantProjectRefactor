
//express
const express = require('express');
const app = express();
const port = 3000;

// router
const router = require('./routes');

// express-session
const session = require('express-session');

const flash = require('connect-flash');



// express-handlebars
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views')

// method-override
const methodOverrid = require('method-override')

// middleware
// middlewares message-handler
const messageHandler = require('./middlewares/message-handler');
// middlewares error-handler
const errorHandler = require('./middlewares/error-handler');

// static file
app.use(express.static('public'))

// method-override
app.use(methodOverrid('_method'))
// bodyParser & x-www-form-urlencoded to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// exoress-session
app.use(session({
  secret: 'useAnyString', // process.env.SESSION_SECRET
  resave: false,
  saveUninitialized: false
}));

// connect-flash
app.use(flash());

// middlewares message-handler
app.use(messageHandler);

// router
app.use(router)

// middlewares error-handler
app.use(errorHandler);

// listen
app.listen(port, () => {
  console.log(`express server on http://localhost:${port}`)
})