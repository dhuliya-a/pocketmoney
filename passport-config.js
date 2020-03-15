const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const User = require('./models/user');

function initialize(passport){
  const authenticateUser = (email, password, done) =>{
    const user = User.findOne({email: email});
    if (user==null){
      return done(null, false, {message: "No user with that email address."});
    }
    bcrypt.compare(password, user.password)
      .then((domatch)=>{
        if (domatch){
          return done(null, user);
        }
        return done(null, false, {message: "Incorrect Password."});
      }).catch(err=>{
        return done(err);
      });

  }
  passport.use(new LocalStrategy({usernameField:'email'}, authenticateUser));
  passport.serializeUser((user, done)=>{
    done(null, user.id);
  });
  passport.deserializeUser((id, done)=>{
    done(null, User.findById(id));
  });
}

module.exports = initialize;
