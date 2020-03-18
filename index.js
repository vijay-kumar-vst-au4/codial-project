const express=require('express');

const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use for router
app.use('/',require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views'); 

app.listen(port,function(err)
{
    if(err)
    {
        console.log('error is is coming:',err);
        return ;
    }
    console.log('server is running fine on port no:',port);
});