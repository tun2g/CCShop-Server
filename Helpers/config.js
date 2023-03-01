const mongoose=require('mongoose')

mongoose.set('strictQuery', false);

async function connect(){
    try{
        await mongoose.connect(process.env.USER_DB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("connected")
    }
    catch(err){
        console.log('failed')
    }

}


module.exports={connect}