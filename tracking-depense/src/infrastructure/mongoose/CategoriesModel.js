const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    id: String,        
    name: String,        
    color: String,      
    icon: String,       
    userId: String,  
});

module.exports = mongoose.model('Categories', categoriesSchema);
