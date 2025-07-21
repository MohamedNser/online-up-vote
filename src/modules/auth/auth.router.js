import { Router } from "express";
import * as authRouter from './controller/register.js'
import { validation } from "../../middleware/validation.js";
import * as validators from "./controller/auth.validation.js"
const router = Router()

router.post('/signup' , validation(validators.signup),authRouter.signup)
router.get('/confirmEmail/:token',validation(validators.confirmEmail) , authRouter.confirmEmail )
router.post('/signin' , validation(validators.signin),authRouter.signin )
export default router