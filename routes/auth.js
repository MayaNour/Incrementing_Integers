const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {userValidation} = require('../validation');

router.post('/register', async function (req, res){
    
    //Let's validate data before save a user
    const {error} = userValidation(req.body);
    if(error) return res.render('index', {error: error.details[0].message});

    //Hash passwords 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET);
        res.cookie('authtoken', token, {
            expires: new Date(Date.now() + 604800000),
            secure: true,
            httpOnly: false,
          });
        res.render('home', {username: user.email,
                            current: savedUser.current,
                            authtoken: token});
    }catch(err){
        res.render('index', {error: err.message});
    }
});


router.post('/login', async (req, res) => {

    //Let's validate date before login a user
    const {error} = userValidation(req.body);
    if(error) return res.render('login', {error: error.details[0].message});

    // check if an email exists 
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.render('login', {error: 'Email does not exist, you need to signup first'});

    // check if a password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.render('login', {error: 'Invalid password'});

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.cookie('authtoken', token, {
        expires: new Date(Date.now() + 3600000),
        secure: true,
        httpOnly: false,
      });
    res.render('home', {username: user.email,
                        current: user.current,
                        authtoken: req.cookies.authtoken});
});


module.exports = router;