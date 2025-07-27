import { Router } from "express";
import * as postController from "./controller/post.js"
import * as CommentController from "./controller/comment.js"
import {auth} from "../../middleware/auth.js"
import { fileValidation, HME, myMulter } from "../../../service/multer.js";
const router = Router()

router.post('/' , auth() , myMulter(fileValidation.image).array('image' , 5)
, HME ,postController.post  )

router.post('/:id/comment' , auth() ,CommentController.comment)

router.get('/' ,postController.getPosts)
router.patch('/:postId/like' ,auth(), postController.likePost)
router.patch('/:postId/dislike' , auth(),postController.dislikePost)


export default router