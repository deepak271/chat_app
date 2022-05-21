const { render } = require('ejs');
const db = require('../database/connection')
const nodemail = require('nodemailer');
const randstr = require('randomstring');
const dotenv = require('dotenv').config();

const  sendEmailToUser = (user,mail,token)=>
{
    const transport = nodemail.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        requireTLS:true,
       auth: {
        user: process.env.mailid,
        pass: process.env.passkey
    }
    })
    console.log(token);
    const link = `http://localhost:3000/api/forget?id=${token}`
    var mailOptions = {
        from: process.env.mailid,
        to: mail,
        subject: 'Plase click on below link to reset password',
        html:`<p>Please click the link to reset password <a href = "http://localhost:3000/api/forget?id=${token}">${link}</a> </p>`
        }
        transport.sendMail(mailOptions,(err,info)=>{
            if(err)
            console.log(err);
            else{
                console.log('mail send successfully');

            }
        })
}
exports.finduser = (req,res)=>{
 if(req.body.email==='')
  res.render('login',{message:"please enter details"})

  const qr = "select * from udata where email = ?";

  db.query(qr,[req.body.email],function(err,data){
      if(err)
      throw err;
      else{
          req.session.islogged=true;
          res.redirect('/home')
      }
  })
}

exports.adduser=(req,res)=>{
    if(req.body.email==='' ||  req.body.password==='' || req.body.fname==='')
    res.render('signup',{message:"please enter all details"})
   else{
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
}

exports.findemail=(req,res)=>{
    if(req.body.email==='')
    res.render('forget',{message:"please enter your email"})
    else{
        const mail = req.body.email;
        const qr = "select * from udata where email = ?";
        db.query(qr,[mail],(err,reslt)=>{
       if(reslt.length===0)
         {
            res.render('forget',{message:"email is incorrect"});
         }
         else{
            const str = randstr.generate();
            const quer= "update udata set token = ? where email = ?";
            db.query(quer,[str,mail],(err,res)=>{
              if(err)
               console.log(str+'error');
            })
           sendEmailToUser(reslt.fname,mail,str)
           res.render('login',{message:"mail send suceessfully"});
           const que= "update udata set token = ? where email = ?";
            db.query(que,['',mail],(err,res)=>{
              if(err)
               console.log(str+'error');
            })
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
        db.query(qr,[mail],(err,reslt)=>{
            if(reslt.length===0)
         {
            console.log(reslt.length);
            res.render('forget',"email is incorrect");
         }
        })
    }
}