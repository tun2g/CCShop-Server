const redis=require('redis')
const client=require('../Services/redis')
const redisController={
    setKey:(req, res,next) => {
        try {
            const {value,key}=req.body;        
            client.set(key, value, redis.print);
            next()
        } catch (error) {
            next(error)
        }
        
    },
    getKey: async(req,res,next)=>{
        try {
            const {key}=req.body
            const token = await client.get(key)
            return res.json({
                status:200,
                token:token
            })
        } catch (error) {
            next(error)
        }
        
    }
    
}

module.exports=redisController