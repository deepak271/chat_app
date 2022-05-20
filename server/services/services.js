
exports.login = (req,res)=>{
res.render('login',{message:"error"});
}

exports.signup = (req,res)=>{
    res.render('signup',{message:"error"});
}

exports.homepage = (req,res)=>{
    res.render('homepage')
}

exports.forget = (req,res)=>{
    res.render('forget',{message:""})
}

exports.reset = (req,res)=>{
    res.render('set_pass',{messsage:""})
}