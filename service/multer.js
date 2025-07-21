import multer from 'multer'
export const fileValidation = {
    image:['image/png' ,'image/jpeg','image/jif'   ]
}

export const HME = (err , req,res,next)=>{
    if (err) {
        res.status(400).json({message:"multer error" , err})
    } else {
        next()
    }
}
export function myMulter(customvalidation = fileValidation.image){
    const storage = multer.diskStorage({})

    function fileFilter (req, file, cb) {
        if (customvalidation.includes(file.mimetype)) {
            cb('in-valid format' , false)
        } else {
            cb(null , true)
        }

}
const upload = multer({ fileFilter, storage })
return upload
}