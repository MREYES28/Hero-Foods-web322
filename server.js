const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require("path");
const PORT = process.env.PORT || 8080;
app.use(express.static('menus'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: false}));

require('dotenv').config({path: "./config/keys.env"});

const indexcontroller = require("./controllers/index");
const signcontroller = require("./controllers/sign");
const mealcontroller = require("./controllers/meal");
const logincontroller = require("./controllers/login");
const redirectconfirm = require("./controllers/redirectconfirm");

app.use("/", indexcontroller);
app.use("/meal", mealcontroller);
app.use("/sign", signcontroller);
app.use("/login", logincontroller);
app.use("/redirectconfirm", redirectconfirm);

app.post('/login', (req,res) => {
    const error1 = [];
    const error2 = [];

    if(req.body.email == "")
    {
        error1.push ("This field is required.");
    }

    if(req.body.password == "")
    {
        error2.push("This field is required.");
    }

    if(error1.length > 0)
    {
        res.render('login' , {
            title: 'Login',
            errorMessages: error1
        });
        return;
    }

    else{
        res.redirect("/");
    }

    if(error2.length > 0)
    {
        res.render('login', {
            title: 'Login',
            errorMessages: error2
        });
        return;
    }

    else{
        res.redirect("/");
    }

});

app.listen(8080, () => {
    console.log('Server starting at port', 8080);
});
