let userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerform =async(req,res)=>{
  try{
   res.render('register')
  }
  catch(err){
console.log(err)
  }
}

const register = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    console.log(passwordHash)
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image:'images/'+req.file.filenme,
      password: passwordHash
    });

    await newUser.save();

    res.render('register',{message : "register successfully"})
// console.log(newUser)
//     // Create a token for the newly registered user
//     const token = jwt.sign({ userId: newUser._id }, 'naman', { expiresIn: '30d' });
//    return res.status(201).json({
//     success :true,
//     message : "user created successfully",
//     token: token


  //  })
    // res.render('register', { message: 'Your registration has been completed', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate token for logged in user
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '30d' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {register,registerform,login}