const redis=require('../Services/redis')
const redisController={
    setKey:(req, res,next) => {
        try {
            const {value}=req.body
            const key=req.cookies.email
            redis.set(key, value,"EX",60, redis.print);
            next()
        } catch (error) {
            next(error)
        }
        
    },
    getKey: async(req,res,next)=>{
        try {
            const key=req.cookies.email
            const token = await redis.get(key)
            return res.json({
                status:200,
                token:token
            })
        } catch (error) {
            next(error)
        }
        
    },
    
    set:async(req,res)=>{
        try {
            const {key,value}=req.body
            redis.set(key,value,redis.print)
        } catch (error) {
            console.log(error)
        }
    },

    get:async(req,res)=>{
        try {
            const key=req.body.key
            const value= await redis.get(key)
            res.json({value:value})
        } catch (error) {
            console.log(error)
        }
    }
    ,
    del:async(req,res)=>{
        try {
            const key=req.body.key
            await redis.del(key)
            res.json({message:"Xóa thông báo thành công"})
        } catch (error) {
            console.log(error)            
        }
    }
    
}

module.exports=redisController