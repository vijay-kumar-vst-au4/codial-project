const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Codeial_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to db"));
db.once('open',function()
{
    console.log('connected to the database ::mongodb');
});


module.exports=db;