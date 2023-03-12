const redis=require('redis')
const client=require('../Services/redis')
const redisController={
    setKey:(req, res,next) => {
        try {
            const {value}=req.body
            const key=req.cookies.email
            client.set(key, value,"EX",60, redis.print);
            next()
        } catch (error) {
            next(error)
        }
        
    },
    getKey: async(req,res,next)=>{
        try {
            const key=req.cookies.email
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