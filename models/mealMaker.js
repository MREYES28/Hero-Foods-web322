const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema =  new Schema({
    mealPackageName: {type: String, required:true},
    mealPackagePrice: {type: String},
    mealPackageDesc: {type: String},
    mealPackageType: {type:String},
    topPackage: {type: String}

});

const mealModel = mongoose.model('mealMaker', mealSchema);

module.exports = mealModel;