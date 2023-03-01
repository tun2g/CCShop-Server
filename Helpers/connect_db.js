const mongoose=require('mongoose');
require('dotenv').config();

const conn=mongoose.createConnection(process.env.USER_DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

conn.on('connected',function(){
    console.log(`Connected ${this.name}`);
}) 

conn.on('disconnected',function(){
    console.log(`Disconnected ${this.name}`);
})

conn.on('error',function(){
    console.log(`Error to connect ${JSON.stringify(console.error())}`);
})


process.on('SIGINT',async()=>{
    await conn.close();
    process.exit(0);
})


module.exports=conn