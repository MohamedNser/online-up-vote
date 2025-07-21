import dotenv from 'dotenv'
dotenv.config({path:'./service/.env'})
import express from "express"
import * as IndexRouter from "./src/modules/index.js"
import connectedDB from './DB/connectedDB.js'

const app = express()
const port = 3000 
app.use(express.json())
const BaseUlr =process.env.BASEURL

app.use(`${BaseUlr}/auth` , IndexRouter.authRouter)
app.use(`${BaseUlr}/post` , IndexRouter.postRouter)
app.use(`${BaseUlr}/user` , IndexRouter.userRouter)

app.use((req, res)=>{
res.status(404).json({message: "in-valid page"})})
connectedDB()
app.listen(`${port}` ,console.log(`server running  ${port}`)
)