const Joi=require('joi')

const userValidation=(data)=>{
    const userSchema=Joi.object({
        email:Joi.string().email().required().lowercase(),
        password:Joi.required().string().min(4).max(32)
    })

    return userSchema.validate(data)
}

module.exports={userValidation}