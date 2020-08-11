const dashBoardLoader = (req,res)=>{

    if(req.session.user.type=="Admin")
    {
        res.render("adminPage");
    }
    
    else
    {
        res.render("userPage");
    }

}

module.exports = dashBoardLoader;