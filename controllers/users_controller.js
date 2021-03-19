const User=require('../models/user');
module.exports.profile=function(req,res)
{
if(req.cookies.user_id)
  {
  User.findById(req.cookies.user_id,function(err,user)
  
  {
   if(user) {
      return res.render('user_profile',{
       title:"User rofile",
       user:user
      }) ;
   } 
   return res.redirect('/users/sign-in');
  }
  
  
  );
  

  }
     
  else
  {
      return res.redirect('/users/sign-in');
  }
}
module.exports.signUp=function(req,res)
{
    return res.render('user_sign_up',{
        title:"Codeial|sign Up"
    });
}
module.exports.signIn=function(req,res)
{
    return res.render('user_sign_in',{
        title:"Codeial|sign In"
    });
}
//get the signup data
module.exports.create=function(req,res)
{
if(req.body.password!=req.body.confirm_password)
 return res.redirect('back');
 User.findOne({email:req.body.email},function(err,user)
 {
     if(err)
     {
         console.log('error in finding user in signing up');
         return ;
     }
    if(!user)
    {
        User.create(req.body,function(err,user)
        {
        if(err)
         {console.log('error in finding user in signing up');
         return ;}

         return res.redirect('/users/sign-in');
     
        });
    }
    else
    {
        return res.redirect('back');
    }
 
    });
}
//sign in and create the session for that
module.exports.createSession=function(req,res)
{
    //step to authenticate
    //find the user
    console.log("user creating session");
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err)
         {console.log('error in finding user in signing in');
         return ;}
         //handle user found
         if(user)
         {
           //handle password which doest' match
           if(user.password!=req.body.password)
           {
              res.redirect('back')
           }
           //handel session
           res.cookie('user_id',user.id);
           return res.redirect('/users/profile');
        }
         else
         {
             //handle user not found
           return  res.redirect('back');
         }
    });
}

