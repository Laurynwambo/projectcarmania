const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User  = require("../models/user");

exports.login =async (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    try {
        console.log("Body",req.body);

        const user = await User.findOne({
          where:{
            username: username,
          }
        });
        if (!user) {
            const error = new Error(
                "A user with this username could not be found."
            );
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Wrong password");
            error.statusCode = 401;
            throw error;
        }
        const accessToken = jwt.sign(
            {
                username: user.username,
                userId: user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "72h",
            }
        );
        res.status(200).json({
            accessToken,
            userId: user.id,
        });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.signup =async  (req,res,next)=>{
    const {
        username,
        password,
        firstName,
        lastName,
        phone,
        email,
    } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const user  =await User.create({
            username,
            password,
            firstName,
            lastName,
            phone,
            email,
            password: hashedPassword,
        });
        console.log(user);
     
        res.status(201).json({
            message: "User created!",
            userId: user.id,
        });
    } catch (err) {
        next(err);
    }
}