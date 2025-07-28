import { Router } from "express";
import * as profilePicture from "./controller/user.js"
import { auth } from "../../middleware/auth.js";
import { fileValidation, HME, myMulter } from "../../../service/multer.js";
import { endPoints } from "./controller/user.endpoint.js";


const router = Router()

router.get('/profile' , auth(endPoints.getProfile) ,profilePicture.profile)
router.patch('/profilePic' , auth(endPoints.profilePic),myMulter(fileValidation .image).single('image'),
HME ,profilePicture.profilePic)
router.patch('/profileCoverPic' , auth(),myMulter(fileValidation .image).array('image' , 8),
HME ,profilePicture.profileCoverPic)


export default router