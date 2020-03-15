const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const MONGODB_URI = require('./config/mongodb');
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth_routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));

// app.use(cookieParser());

// // Express Session
// app.use(session({
//    secret: 'secret',
//    saveUninitialized: true,
//    resave: true
//  }));

 
 // Passport init
//  app.use(passport.initialize());
//  app.use(passport.session());

 
app.use(authRoutes);


mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true }).then((client)=>{
   console.log("Connected to mongoDB");
   app.listen(3000,()=>{
      console.log("Connected to the server.");
   });
}).catch(err=>{
   console.log(err);
});


