const express = require ('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index');
});

router.get('/MealPkg', (req, res) =>{
    res.render('MealPkg');
});

router.get('/registration', (req, res) =>{
    res.render('registration');
});

router.get('/login', (req, res) =>{
    res.render('login');
});

router.get('/recover', (req, res) =>{
    res.render('recover');
});

router.get('/redirectconfirm', (req, res) =>{
    res.render('redirectconfirm');
});


router.post('/sign', (req,res) => {

    const { firstname, lastname, email, password } = req.body
    
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
      to: `${email}`,
      from: `mreyes28@myseneca.ca`,
      subject: 'Testing email sending',
      text: 'I can send emails now, hahahaha',
      html: `<strong>Thank you for registering ${firstname} ${lastname}</br>
            Email: ${email}
            </strong>`
    };
    
    //Asynchronous operation
    sgMail.send(msg)
    .then(()=> {
        res.redirect("/redirectconfirm");
    })
    
    .catch(err => {
        console.log(`Error ${err}`);
    })

    const error1 = [];
    const error2 = [];
    const error3 = [];
    const error4 = [];

    if(req.body.firstname == "") {
        error1.push("This field is required.");
    }

    if(req.body.lastname == "") {
        error2.push("This field is required");
    }

    if(req.body.email == "") {
        error3.push("This field is required.");
    }

    if(req.body.password == "") {
        error4.push("This field is required");
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

    if(error4.length > 0) {
        res.render('registration', { 
            title: 'Create account',
            errorMessages: error4
        });
        return;
    }
});
    

module.exports = router;