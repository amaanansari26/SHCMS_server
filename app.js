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
    app.use((req,res,next)=>{
        req.session.user="user1"
        next()
    })
    app.use((req,res)=>{
        res.send('server is up bitch!')
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