const exp = require('constants')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const homeRouter=require('./routers/homeRouter')
const productRouter=require('./routers/productRouter')
const userRouter=require('./routers/userRouter')
const config=require('./config/index')
const { dbconStr } = require('./config/index')

const morgan=require('morgan')

const auth=require('./utils/auth')
const fileStream = require('./utils/requestLogger')

const port = process.env.port || 5000;


mongoose.set('strictQuery', true);

mongoose.connect(config.dbconStr,
    () => console.log('Connected to DB...'),
    (err) => console.error(err)
)

app.listen(port, () => console.log(`Server Listening on port ${port}...`))

app.use(express.json())
app.use(express.static('uploads/'))

app.use(morgan('dev',{skip:function(req,res){return res.statusCode<400}}))
app.use(morgan('combined',{stream:fileStream}))

app.use('/',homeRouter)
app.use('/api/users',userRouter)

app.use(auth.tokenauth)

app.use('/api/products',productRouter)


app.get('*', (req, res) => {
    res.status(400)
    res.send('Page not Found...')
})