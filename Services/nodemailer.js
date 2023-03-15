const nodemailer=require('nodemailer')
const JWT=require('jsonwebtoken')
const User=require('../Models/User.model')

// Gửi email xác nhận với mã xác nhận
const sendVerificationEmail = async (user) => {

    console.log("user",user)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.ethereal.email',
        port: 465,
        secure: true,
        auth: {
            user: process.env.YOUR_EMAIL,
            pass: process.env.YOUR_PASSWORD
        },
        tls: {
            // Do not fail on invalid certs
            rejectUnauthorized: false
        },
        requireTLS: true
    });
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    const token = JWT.sign({ email: user.email }, process.env.JWT_MAIL_KEY, { expiresIn: '60s' });
    
    const updateUser = await User.findById(user._id);
    updateUser.verificationToken=token
    await updateUser.save()
    
    const verificationLink = `http://localhost:20617/verify/verify-user-by-token/${token}`;
    const name=user?.username?.split(' ')[-1]
    await transporter.sendMail({
      from: process.env.YOUR_EMAIL,
      to: user.email,
      subject: 'Verify your email address',
      html: `<p>Hi ${name},</p>
      <p>Please click the following link to verify your email address:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`,
    });
  };

// Xác nhận người dùng với mã xác nhận
const verifyUser = async (req,res) => {
    try {
      const token=req.params.token
      console.log("token",token)
      JWT.verify(token, process.env.JWT_MAIL_KEY,async(err,user)=>{
        if(err)
        {
          return res.send("Token không hợp lệ");
        }
        console.log("user",user)
        const updateUser=await User.findOne({email:user.email})
        updateUser.isVerified=true
  
        await updateUser.save()

        res.send("Oke r nhé")
      });
      
      
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  module.exports={sendVerificationEmail,verifyUser}