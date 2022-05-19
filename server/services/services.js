exports.login = (req,res)=>{
res.render('login',{message:"error"});
}

exports.signup = (req,res)=>{
    res.render('signup',{message:"error"});
}

exports.homepage = (req,res)=>{
    res.render('homepage')
}