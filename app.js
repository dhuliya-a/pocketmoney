const express = require('express');
const bodyParser = require('body-parser');


const MONGODB_URI =
'mongodb+srv://dhuliya_a:Bottle01@cluster0-umogv.mongodb.net/e-wallet?retryWrites=true&w=majority';

const mongoose = require('mongoose');
//routes
const authRoutes = require('./routes/auth_routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));

app.use(authRoutes);


mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true }).then((client)=>{
   console.log("Connected to mongoDB");
   app.listen(3000,()=>{
      console.log("Connected to the server.");
   });
}).catch(err=>{
   console.log(err);
});


