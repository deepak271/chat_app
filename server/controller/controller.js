const { render } = require('ejs');
const db = require('../database/connection')

exports.finduser = (req,res)=>{
 if(!req.body.email)
  res.render('login',{message:"please enter details"})

  const qr = "select * from users where email = ?";

  db.query(qr,[req.body.email],function(err,data){
      if(err)
      throw err;
      else{
          res.redirect('/home')
      }
  })
}

exports.adduser=(req,res)=>{
    
    const user ={
        "id":4,
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password
    }
    const qr = "insert into users SET ?";
    db.query(qr,user,(err,resl)=>{
        if(err)
        throw err;
        else{
            res.send(data)
            console.log('data inserted');
        }
    })
}