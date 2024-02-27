const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/model");
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    console.log(name, password, email);
    if (!name || !password || !email) {
      return res.status(404).json({
        err: "bad request",
      });
    }

    const userIsExist = await User.findOne({ email: email });
    if (userIsExist) {
      return res.status(409).json({ err: "user is already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name,
      email,
      password: hashPassword,
    });
    await userData.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "BAD REQUEST! INVAILD CREDENTIALS",
      });
    }
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(401).json({ error: "INVAILD CREDENTIALS" });
    }
    const passwordMatch = await bcrypt.compare(password,userDetails.password)
    if(!passwordMatch){
        return res.status(401).json({error:"PASSWORD NOT MATCH",success:false})
    }
    const token = jwt.sign({id:userDetails._id},process.env.SECRET_KEY)
    res.json({message:'User logged In ',success:true,name:userDetails.name,token:token})
  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
