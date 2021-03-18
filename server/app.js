const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')
const app = express()
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors())
dotenv.config()
let options = cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
};
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //  res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongoose.connect(process.env.DB_CONNECT, connectionParams).then(() => {
    console.log('db connected')
}).catch(err => { console.log(err) })


app.use('/users', userRouter)
app.use('/tasks',taskRouter)

app.listen(3030, console.log('app is listen at port 3030'))