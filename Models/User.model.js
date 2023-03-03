const mongoose=require('mongoose');
const cryptoJS=require('crypto-js')
const bcrypt=require('bcrypt')
const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        index:true,
        unique:true,
        require:true,
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
});

UserSchema.pre('save',async function(next){
    try{
        // const salt = Date.now().toString(16);
        // const pwSalt = this.password + salt;
        // const hashedPassword = cryptoJS.SHA3(pwSalt, { outputLength: process.env.HASH_LENGTH * 4 }).toString(cryptoJS.enc.Hex);
        // this.password=hashedPassword

        
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(this.password,salt)
        this.password=hashedPassword
        next();
    }
    catch (err){
        next(err)
    }
})

UserSchema.methods.isRightPassword=async function(password){
    try {
        return await bcrypt.compare(password,this.password)
    } catch (error) {
        
    }
}

  
module.exports=mongoose.model('User',UserSchema);