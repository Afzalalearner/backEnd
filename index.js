const exp = require('constants')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const homeRouter=require('./routers/homeRouter')
const productRouter=require('./routers/productRouter')

const port = process.env.port || 5000;


mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/fullapp',
    () => console.log('Connected to DB...'),
    (err) => console.error(err)
)

app.listen(port, () => console.log(`Server Listening on port ${port}...`))
app.use(express.json())
app.use('/',homeRouter)
app.use('/api/products',productRouter)

app.get('*', (req, res) => {
    res.status(400)
    res.send('Page not Found...')
})