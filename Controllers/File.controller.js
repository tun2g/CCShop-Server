const cloudinary=require('../Services/cloudinary')

const fileController={

    postFileToCloud:async(req,res,next)=>{
      try {
        const upload = await cloudinary.uploader.upload(req.file.path);
        return res.json({
          success: true,
          file: upload.secure_url,
        });
      } catch (error) {
        console.log(error)
      }
      
    },
}


module.exports=fileController