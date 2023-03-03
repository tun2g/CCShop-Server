const Joi=require('joi')

const userValidation=(data)=>{
    const userSchema=Joi.object({
        username:Joi.string().min(6).required(),
        email:Joi.string().email().lowercase().required(),
        password:Joi.string().min(4).max(32).required()
    })

    return userSchema.validate(data)
}

module.exports={userValidation}