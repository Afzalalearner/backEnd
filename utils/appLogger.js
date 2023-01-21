const bunyan=require('bunyan')
const fs=require('fs')
const path=require('path')

const logsDir=path.join(__dirname,'..','logs','appLog')
if(!fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir)
}
//not working properly
const logger=bunyan.createLogger({
    name:'Backend',
    streams:[
        {path:path.join(logsDir,'error.log'),level:'error'},
        {stream:process.stderr,level:'error'},
        {path:path.join(logsDir,'warn.log'),level:'warn'},
        {stream:process.stdout,level:'warn'},
        {path:path.join(logsDir,'error.log'),level:'info'},

        {path:path.join(logsDir,'error.log'),level:'debug'},

    ]
})


module.exports=logger;