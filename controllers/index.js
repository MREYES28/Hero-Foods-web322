const express = require ('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const mealModel = require('../models/mealMaker.js');
const registerModel = require('../models/register.js');
const Cart = require('../models/cart');
const isAuthenticated = require("../middleware/auth");
const dashBoardLoader = require("../middleware/authorization");

router.get('/', (req, res) =>{
    mealModel.find({})
    .then((meals)=>{
      const mealShow = meals.map(meal=>{
          return{
              id: meal._id,
              mealPackageName: meal.mealPackageName,
              mealPackagePrice: meal.mealPackagePrice,
              mealPackageDesc: meal.mealPackageDesc,
              mealPackageType: meal.mealPackageType,
              topPackage: meal.topPackage
          }
      });

      res.render("index", {
          
          data : mealShow
      });
  })
  .catch(err=>console.log(`Error when pulling from the database :${err}`));
});

router.get('/registration', (req, res) =>{
    res.render('registration');
});


router.get('/recover', (req, res) =>{
    res.render('recover');
});

router.get('/redirectconfirm', (req, res) =>{
    res.render('redirectconfirm');
});

router.get('/userPage', (req, res) =>{
    res.render('userPage');
});

router.get('/addMeals', (req, res) =>
{
    res.render('addMeals');
});

router.get('/update', (req, res) =>
{
    res.render('update');
});

router.get('/shopCart', function(req, res, next)
{
    if (!req.session.cart){
        return res.render('shopCart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shopCart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get("/cart", (req, res) =>
{
    mealModel.find({})
    .then((meals)=>{
      const mealShow = meals.map(meal=>{
          return{
              id: meal._id,
              mealPackageName: meal.mealPackageName,
              mealPackagePrice: meal.mealPackagePrice,
              mealPackageDesc: meal.mealPackageDesc,
              mealPackageType: meal.mealPackageType,
              topPackage: meal.topPackage
          }
      });

      res.render("cart", {
          
          data : mealShow
      });
  })
  .catch(err=>console.log(`Error when pulling from the database :${err}`));
});

router.get('/addCart/:id', (req,res) =>{
    var prodID = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    mealModel.findById(prodID, function(err, product)
    {
        if (err){
            console.log(`error ${err}`)
            res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart');
        
    });
});

router.get("/editMeals", (req, res) =>
{
    mealModel.find({})
    .then((meals)=>{
      const mealShow = meals.map(meal=>{
          return{
              id: meal._id,
              mealPackageName: meal.mealPackageName,
              mealPackagePrice: meal.mealPackagePrice,
              mealPackageDesc: meal.mealPackageDesc,
              mealPackageType: meal.mealPackageType,
              topPackage: meal.topPackage
          }
      });

      res.render("editMeals", {
          
          data : mealShow
      });
  })
  .catch(err=>console.log(`Error when pulling from the database :${err}`));
});

//editing meals

var id = "";

router.put('/update/:id', (req, res) =>
{
    id = req.params.id;
    console.log(id);
    res.redirect('/update');
});

router.put("/Mupdate",(req,res)=>{

    const meal =
    {
       mealPackageName: req.body.mealPackageName,
       mealPackagePrice: req.body.mealPackagePrice,
       mealPackageDesc: req.body.mealPackageDesc,
       mealPackageType: req.body.mealPackageType,
       topPackage: req.body.topPackage
    }

    mealModel.updateOne({_id:id},meal)
    .then(()=>{
        res.redirect("/adminPage");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));


});

//showing meals
router.get("/MealPkg", (req,res)=>
{
    
    mealModel.find({})
      .then((meals)=>{
        const mealShow = meals.map(meal=>{
            return{
                id: meal._id,
                mealPackageName: meal.mealPackageName,
                mealPackagePrice: meal.mealPackagePrice,
                mealPackageDesc: meal.mealPackageDesc,
                mealPackageType: meal.mealPackageType,
                topPackage: meal.topPackage
            }
        });

        res.render("MealPkg", {
            
            data : mealShow
        });
    })
    .catch(err=>console.log(`Error when pulling from the database :${err}`));
    
});

// creating meals
router.post('/addMeals', (req,res)=>
{
    const succ = [];
    const newMeal = 
    {
        mealPackageName: req.body.mealPackageName,
        mealPackagePrice: req.body.mealPackagePrice,
        mealPackageDesc: req.body.mealPackageDesc,
        mealPackageType: req.body.mealPackageType,
        topPackage: req.body.topPackage
    }
    const meal = new mealModel(newMeal);
    meal.save()
    .then(() =>{
        succ.push("Meal created!");
        console.log(`${meal}`);
        res.render("adminPage", {succ});
    })
    .catch(err=>console.log(`Error!!! :${err}`));
})




// adding new user
router.post('/sign', (req,res)=>
{
    const newUser = 
    {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }

    const error1 = [];
    const error2 = [];
    const error3 = [];

    if(req.body.username == "") {
        error1.push("This field is required.");
    }

    if(req.body.email == "") {
        error2.push("This field is required.");
    }

    if(req.body.password == "") {
        error3.push("This field is required");
    }

    //This is if the user failed validation
    if(error1.length > 0) {
        res.render('registration', { 
            title: 'Create account',
            errorMessages: error1 
        });
        return;
    }

    if(error2.length > 0) {
        res.render('registration', { 
            title: 'Create account',
            errorMessages: error2
        });
        return;
    }

    if(error3.length > 0) {
        res.render('registration', { 
            title: 'Create account',
            errorMessages: error3
        });
        return;
    }

    const user = new registerModel(newUser);
    user.save()
    .then(()=>{

        console.log(`${user}`);
    })
    .catch(err=>
        {

        console.log(`Error ${err}`);
        res.redirect("registration");
        })

        const { username, email, password } = req.body
    
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
          to: `${email}`,
          from: `mreyes28@myseneca.ca`,
          subject: 'Thanks for Registering With Hero Foods!',
          text: 'I can send emails now, hahahaha',
          html: `<strong>Thank you for registering ${username}</br>
                Email: ${email}
                </strong>
                Welcome to HeroFoods!
                `
        };
        
        //Asynchronous operation
        sgMail.send(msg)
        .then(()=> {
            res.redirect("/redirectconfirm");
        })
        
        .catch(err => {
            console.log(`Error ${err}`);
        })
});

router.get('/login', (req, res) =>{
    res.render('login');
});


router.get('/adminPage', (req, res) =>{
    res.render('adminPage');
});



// logging in
router.post('/login', (req,res)=>
{
    //error check if null
    const error2 = [];
    const error3 = [];

    if(req.body.email == "") {
        error2.push("This field is required.");
    }

    if(req.body.password == "") {
        error3.push("This field is required");
    }

    //This is if the user failed validation

    if(error2.length > 0) {
        res.render('login', { 
            title: 'Create account',
            errorMessages: error2
        });
        return;
    }

    if(error3.length > 0) {
        res.render('login', { 
            title: 'Create account',
            errorMessages: error3
        });
        return;
    }

// null checking ends here

    registerModel.findOne({email:req.body.email})
    .then(user=>{
        const err = [];

        if(user == null)
        {
            err.push("Email/Password incorrect!");
            res.render('login', {err})
        }

        else
        {
            bcrypt.compare(req.body.password, user.password)
            .then(isMatch=>{
                

                if(isMatch)

                {
                        if(user.type =="Admin")
                        {
                            req.session.user = user;
                            res.redirect("adminPage");
                        }
                        else{
                       
                    
                console.log(`This is User: ${user}`)
                req.session.user = user;

                res.redirect("userPage");
                        }
                }

                else
                {
            err.push("Email/Password incorrect!");
            res.render('login', {err})
                }

            })
            .catch(err=>console.log(`Error ${err}`));
        }
    })
    .catch(err=>console.log(`Error ${err}`));
})



router.get("userPage",isAuthenticated,dashBoardLoader);
router.get("adminPage",isAuthenticated,dashBoardLoader);

router.get("/logout",(req,res)=>{

    req.session.destroy();
    res.redirect("login")
    
});



module.exports = router;