const express = require ('express');
const router = express.Router();
const registerModel = require('../models/register.js');

router.get('/submit', (req, res) =>{
    res.render('../views/registration');
});



module.exports = router;