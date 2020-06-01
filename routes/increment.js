const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');
const {currentNumberValidation} = require('../validation');

router.get('/current', verify, async (req, res) => {
    const user = await User.findById(req.user._id);
    const current_int = user.current;
    return res.send(current_int.toString());
});

router.put('/current', verify, async (req, res) => {

    //Let's validate date before save a user
    const {error} = currentNumberValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findById(req.user._id);

    user.current = req.body.current;
    const updatedUser = await user.save();

    return res.send(updatedUser.current.toString());
});

router.get('/next', verify, async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { $inc: { current: 1 }},{ returnOriginal: false});
    // const updatedUser = await user.save();
    return res.send(user.current.toString());
});

module.exports = router;