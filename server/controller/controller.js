const { render } = require('ejs');
const db = require('../database/connection')

exports.finduser = (req,res)=>{
 if(req.body.email==='')
  res.render('login',{message:"please enter details"})

  const qr = "select * from udata where email = ?";

  db.query(qr,[req.body.email],function(err,data){
      if(err)
      throw err;
      else{
          res.redirect('/home')
      }
  })
}

exports.adduser=(req,res)=>{
    
    // const user ={
    //     "id":1,
    //     "fname":req.body.fname,
    //     "lname":req.body.lname,
    //     "email":req.body.email,
    //     "password":req.body.password
    // }
    const qr = "insert into udata(fname,lname,email,password) values (?,?,?,?)";
    db.query(qr,[req.body.fname,req.body.lname,req.body.email,req.body.password],(err,resl)=>{
        if(err)
        throw err;
        else{
            res.send(resl)
            console.log('data inserted');
        }
    })
}

exports.findemail=(req,res)=>{
    if(req.body.email==='')
    res.render('forget',{message:"please enter your email"})
    else{
        const mail = req.body.email;
        const qr = "select * from users where email = ?";
        db.query(qr,[mail],(err,reslt)=>{
       if(reslt.length===0)
         {
            res.render('forget',{message:"email is incorrect"});
         }
         else{

         }
        })
    }
}

exports.setpass=(req,res)=>{
    if(req.body.email==='')
    res.render('forget',{message:"please enter your email"})
    else{
        const mail = req.body.email;
        const qr = "select * from users where email = ?";
        console.log(mail);
        // db.query(qr,[mail],(err,reslt)=>{
        //     if(reslt.length===0)
        //  {
        //     console.log(reslt.length);
        //     res.render('forget',"email is incorrect");
        //  }
        // })
    }
}