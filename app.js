const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    path=require('path'),
    MongoDBStore = require('connect-mongodb-session')(session),
    MONGODB_URI = 'mongodb+srv://amngithub:9013393120@cluster0.mxpww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    app = express();

    store = new MongoDBStore({
        uri: MONGODB_URI,
        collection: 'sessions'
    });
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(
        session({
            secret: 'my secret',
            resave: false,
            saveUninitialized: false,
            store: store
        })
    );
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json())
    app.use((req,res,next)=>{
        req.session.user="user1"
        next()
    })
    app.get('/device/:id',(req,res)=>{
        const deviceId=req.params.id
        console.log(deviceId)
        res.send('ok')
    })
    app.post('/device/:id',(req,res)=>{
        const deviceId=req.params.id
        console.log(deviceId)
        console.log(req.body)
        res.send('ok')
    })
   
    mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT || 80, () => {
            console.log('80isUP!')
        });
    })
    .catch(err => {
        console.log(err);
    });