const router = require('express').Router();
const userModelSchema = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
router.post('/register', async (req,res) =>{
    //res.send('register ok')

    const emailExists = await userModelSchema.findOne({
        email:req.body.email,
    })

    if(emailExists) return res.send('Email already exists')

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new userModelSchema({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })

    try {
        const saveNewUser = await newUser.save();
        res.send(saveNewUser+' Success');
    } catch (error) {
        res.status(400).send(error+' failed')
    }

});
// Login with
 
 router.post('/login', async (req,res) =>{

    const CheckMail = await userModelSchema.findOne({
        email:req.body.email
    });

    if(!CheckMail) return res.send('Wrong Email')

    const checkPassword = await bcrypt.compare(req.body.password, CheckMail.password)
    if(!checkPassword) return res.send('Wrong Password')

    const token = jwt.sign({_id: CheckMail._id}, process.env.Secret_Token);
    res.header('auth-token', token).send({token:token})

 });


module.exports = router;