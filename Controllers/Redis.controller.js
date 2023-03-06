const redis=require('redix')

const redisController={
    setKey:(req, res) => {
        const {key,value}=req.body;        
        client.set(key, value, redis.print);
        
    },
    getKey:(req,res)=>{
        const {key}=req.body
        client.get(key, (err, reply) => {
            if (err) {
              console.log(err);
            } else {
              res.send(reply);
            }
        });
    }
    
}

module.exports=redisController