const express = require('express')
const app = express()
const router = express.Router()
app.set('view engine', 'ejs')
// app.set('views','./views')
app.use(express.static('public'))
const path = require('path')
const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/images'))

    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name)
    }
})
const upload = multer({storage:storage})
const {register,login,registerform}=require("../controller/userController")
router.get('/register',registerform)
router.post('/register',upload.single('image'),register);
router.get('/login',login)

module.exports = router;
