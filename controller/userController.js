import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'



const createToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
}



//register user

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        // check user already exsist
        const exsist = await userModel.findOne({ email });

        if (exsist) {
           return res.json({ success: false, message: "User Already Exsist" })
        }

        //check email is vaild

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please provide a valid email" });

        }
        //check password is vaild
        if (password.length < 8) {
            return res.json({ success: false, message: "Please provide a valid passowrd" });

        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token: token });

    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:'Error'});
    }


}

//login user

const loginUser = async (req, res) => {

    const {email,password}=req.body;

    try {

        const user=await userModel.findOne({email});

        if(!user){
            return  res.json({success:false , message:'user does not exsist'})
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false , message:'Invalid Credentaials'})
            
        }
         
        const token=createToken(user._id);

        res.json({success:true , token:token});
        
    } catch (error) {
          console.log(error);
          res.json({success:false,message :"Error"});
    }

}

export { registerUser, loginUser };