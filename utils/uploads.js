const multer=require('multer')
const path=require('path')
const fs=require('fs')

const contentDir=path.join(__dirname,'..','uploads')
if(!fs.existsSync(contentDir)){
    fs.mkdirSync(contentDir)
}

const storage=multer.diskStorage({
    destination:'uploads/',
    filename:function(req,file,cb){
        
           const prefix=Date.now()+'_'+Math.round(Math.random()*1E9)
           const nameOfFile=prefix+'_'+file.originalname
           req.body.image=nameOfFile
           cb(null,nameOfFile)
        
    }
})
const upload=multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        if(file.mimetype.startsWith('image'))
        cb(null,true)
        else
        cb('Invalid File Type')
    }
})

module.exports=upload;