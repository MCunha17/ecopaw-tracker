const bcrypt = require('bcryptjs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

// Configure the session
const sess = {
  secret: 'secret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware function
const customMiddleware = (req, res, next) => {
  console.log('Custom middleware function is executed');
  next();
};

app.use(customMiddleware);

// Set up session
app.use(session(sess));

// Configure Handlebars as the template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use(routes);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3001, () =>
    console.log(
      `\nServer running on port ${process.env.PORT || 3001}. Visit http://localhost:${process.env.PORT || 3001} and create an account!`
    )
  );
});