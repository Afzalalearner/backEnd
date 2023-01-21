const rfs=require('rotating-file-stream')
const path=require('path')
const fs=require('fs')

const logsDir=path.join(__dirname,'..','logs','requestLog')
if(!fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir)
}

const fileStream=rfs.createStream('request.log',{interval:'1d',path:logsDir})

module.exports=fileStream