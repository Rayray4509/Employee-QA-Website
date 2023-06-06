import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const url = path.join(__dirname,"../image") 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, url)
    },
    filename: function (req, file, cb) {
       
      cb(null, req.user.e_mail+".png" )
    }
  })
  const upload = multer({
    storage:storage,
    limits: { fileSize:  1048576 },
    fileFilter : (req, file, cb)=>{
        // 只接受三種圖片格式
        
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
            return cb(null, true);
        }
        
        return cb(new Error('only png, jpg, jpeg allow to uploaded'));
      }
}).single("image")

const uploadImg = (req,res)=>{

        upload(req, res, (err)=>{
            if (err instanceof multer.MulterError) {
                return res.status(200).json({"message":err.message})
                // A Multer error occurred when uploading.
            } else if (err) {
                return res.status(200).json({"message":err.message})
                // An unknown error occurred when uploading.
            }
            
            // Everything went fine. 
            return res.status(200).json({"message":"success"})
    
        })
        
  
}

export default{
    uploadImg
}


  