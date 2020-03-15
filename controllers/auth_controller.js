// sign up post and get.
// login post and get.
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Wallet = require('../models/wallet');


// const passport = require('passport');
// const initializePassport = require('../passport-config');
// initializePassport(passport);

exports.getsignup = (req, res, next)=>{
  res.render('views/user/create_user', {
    path: '/views/user/create_user'
  });
};

exports.signup = (req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  console.log(email, password, confirm_password);
  User.findOne({email: email}).then(user=>{
    if (user){
      return res.status(200).send("User exists.").end();
    }
    if (password == confirm_password){
    return bcrypt.hash(password,12).then(hashedPassword=>{
      const user = new User({
        email:email,
        password:hashedPassword
      });
      return user.save().then((user)=>{
            wallet = new Wallet({
              user_id: user._id
            });
            wallet.save().then((wallet)=>{
              const updatedwallet = [];
              updatedwallet.push(wallet);

              User.findByIdAndUpdate(
                user._id,
                {$push: {"wallets": wallet}},
                {safe: true, upsert: true, new : true},
                function(err, model) {
                  console.log("User and Wallet created.")
                }
            );    });
          }).catch((err=>{
            console.log(err);
          }));
          
    })
    .then( result =>{
      res.redirect('/login');
    })
    .catch( err =>{
      console.log(err);
  });}
  else{
    res.status(500).send("{errors: \"Passwords don't match\"}").end();
  }
});
};

exports.getlogin = (req, res, next)=>{
 
};

exports.login = (req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;
  
  User.findOne({email: email}).then(user=>{
    if (!user){
      return res.redirect('/login');
    }
    bcrypt.compare(password, user.password)
      .then((domatch)=>{
        if (domatch){
          console.log("LOGGED IN.");
          return res.redirect('/');
        }
        return res.redirect('/login');
      })
});
};