const path = require('path');
const express = require('express');
const webpack = require('webpack');
const http = require('http');
const config = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const Auth0Strategy = require('passport-auth0');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

dotenv.load();

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


const app = express();

app.use(bodyParser.urlencoded({ extended: true}));



app.use(cors());

app.use(cookieParser());
app.use(session({ secret: process.env.AUTH0_CLIENT_SECRET, resave: false,  saveUninitialized: false }));


app.use(passport.initialize());
app.use(passport.session());

// app.get( '/api', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'www/api.html'));
// });



if ( isDeveloping ) {
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    filename: 'bundle.js',
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
    });

  app.use(middleware);

  app.use(webpackHotMiddleware(compiler));

  app.use(express.static(__dirname + '/static'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './www/index.html'));
  });

}
else {

  app.use(express.static(__dirname + '/dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/index.html'));
  });
}




app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

const server = http.createServer(app);
