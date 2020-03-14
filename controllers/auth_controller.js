// sign up post and get.
// login post and get.
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Wallet = require('../models/wallet');

exports.getsignup = (req, res, next)=>{
  res.render('views/user/create_user', {
    path: '/views/user/create_user'
  });
};

exports.signup = (req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  
  User.findOne({email: email}).then(userdoc=>{
    if (userdoc){
      return res.redirect('/login');
    }
    return bcrypt.hash(password,12).then(hashedPassword=>{
      const user = new User({
        email:email,
        password:hashedPassword
      });
      return user.save();  
    })
    .then( result =>{
      console.log(result);
      res.redirect('/login');
    })
    .catch( err =>{
      console.log(err);
  });
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
// user = new User(
//   {
//     name: "Anubhav Dhuliya",
//     email: "dhuliya.a@gmail.com",
//     phone_no: "9899863458",
//     password: "Passwerd"
//   });

//   user.save().then((user)=>{
//     wallet = new Wallet({
//       user_id: user._id;
//     });
//     wallet.save().then((wallet)=>{
//       console.log("User and Wallet created.")
//     });
//   }).catch((err=>{
//     console.log(err);
//   }));
