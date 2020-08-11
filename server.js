const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');

require('dotenv').config({path: "./config/keys.env"});

const app = express();

app.use(express.static('menus'));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
});

app.use(session({
    
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true
  }));
  
app.use((req,res,next)=>{

  
    res.locals.user = req.session.user;

    next();
});


const indexcontroller = require("./controllers/index");
const signcontroller = require("./controllers/sign");
const mealcontroller = require("./controllers/meal");
const mealPackageController = require("./controllers/MealPkg")
const logincontroller = require("./controllers/login");
const redirectconfirm = require("./controllers/redirectconfirm");
const userPageController = require("./controllers/userPage");
const addMealsController = require("./controllers/addMeals");

app.use("/", indexcontroller);
app.use("/meal", mealcontroller);
app.use("/sign", signcontroller);
app.use("/login", logincontroller);
app.use("/redirectconfirm", redirectconfirm);
app.use("/userPage", userPageController);
app.use("/addMeals", addMealsController);
app.use("/MealPkg", mealPackageController);

mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to database ${err}`));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server starting at port', PORT);
});

