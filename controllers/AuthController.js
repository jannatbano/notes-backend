const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt=require('jsonwebtoken')
const JWT_SECRET="84553873441bf9ba8496226308001a032a1a9dbf4eb0fe4a684a9db5b98b40f3c7a76e8e08d584205fecc35f2c9601cdce5340598b206f669791713d73d27b84   "

const User = require("../model/UserModel");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login= async (req,res)=>{
    try{
    const{email,password}=req.body    
    if(!email||!password){
        return res.status(400).json({
            message:"enter required fields"
        })

    }
    const user =await User.findOne({ email })
    if(!user){
        return res.status(404).json({
            message:"user already exists"
        })
    }
    const isPasswordCorrect= await bcrypt.compare(
        password,
        user.password
    )
    const token=jwt.sign(
        { userId: user._id },
            JWT_SECRET,
        { expiresIn: "1h" }
    )
    if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
    return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token: token
        });
    }
    catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "If this email exists, a reset link has been sent" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    console.log("Reset Link:", resetLink);

    res
      .status(200)
      .json({ message: "If this email exists, a reset link has been sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     if (!user) {
//       return res.status(400).json({ message: "Token invalid or expired" });
//     }

//     user.password = await bcrypt.hash(password, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = { signup, login, forgotPassword, };