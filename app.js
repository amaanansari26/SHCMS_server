const deviceOut = require('./models/deviceOut');

//Dependencies///////////////////////////////////////////////////////////////////
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    path=require('path'),
    Devicein = require('./models/devicein'),
    DeviceOut= require('./models/deviceOut'),
    SoldDevice =require('./models/soldDevice'),
    User =require('./models/user'),
    MongoDBStore = require('connect-mongodb-session')(session),
    MONGODB_URI = 'mongodb+srv://amngithub:9013393120@cluster0.mxpww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    
/////////////////////////////////////////////////////////////////////////////

//config///////////////////////////////////////////////////////////////////////
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http, {
        cors: {
            origin: "http://localhost:80",
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true
        },
        allowEIO3: true
    }),
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
    const err=(e)=>{
        console.log(e)
    }
//////////////////////////////////////////////////////////////////////////////////



//routes//////////////////////////////////////////////////////////////////////////
app.get('/',(req,res)=>{
    res.redirect('/HTML/Azea/HTML/Vertical-IconSidebar/workspace.html')
})
    app.get('/device/:id',(req,res)=>{
        const deviceId=req.params.id
       Devicein.findOne({'deviceId':deviceId}).then(d=>{
           if(!d){
               return res.send('err')
               
           }
           const outgoing={"s0":d.s0,"s1":d.s1,"s2":d.s2,"s3":d.s3,"s4":d.s4,"s5":d.s5}
           res.send(JSON.stringify(outgoing))
       }).catch(err)
        
    })
    app.post('/device/:id',(req,res)=>{
        const deviceId=req.params.id
        console.log(deviceId)
        DeviceOut.findOne({'deviceId':deviceId}).then(d=>{
            if(!d){
                res.send('Unauthorised access')
            }
            d.temp=req.body.temp
            d.humid=req.body.humid
            d.save().then().catch(err)
            
        }).catch(err)
        console.log(req.body)
        res.send('ok')
    })
/////////////////////////////////////////////////////////////////////////////////



//Database seeding///////////////////////////////////////////////////////////////

// const deviceinseed = new Devicein({
//     'deviceId':846,
//     's0':false,
//     's1':false,
//     's2':false,
//     's3':false,
//     's4':false,
//     's5':false
    

// })
// deviceinseed.save().then((data)=>{
//     console.log(data)
// }).catch((err)=>{
//     console.log(err)
// })
// const deviceoutseed= new deviceOut({
//     'deviceId':846,
//     'temp':24,
//     'humid':46
// })
// deviceoutseed.save().then((data)=>{
//          console.log(data)
//     }).catch(err)

///////////////////////////////////////////////////////////////////////////////
///allow header


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:80');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
////end allow header

////websocket test
io.on('connection', function(socket) {
    console.log(socket.id);
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
    socket.on('buttons',(data)=>{
        
        socket.emit("ack", "db updated")
        data=JSON.parse(data)
        Devicein.findOne({"deviceId":data.deviceId}).then((d)=>{
            if(!d){
                socket.emit('ack','device not found check device ID')
                return false
            }
            d.s0=data.status[0]
            d.s1=data.status[1]
            d.s2=data.status[2]
            d.s3=data.status[3]
            d.s4=data.status[4]
            d.s5=data.status[5]
            d.save().then((data)=>{
                socket.emit('ack','db updated')
            }).catch(err)
        }).catch(err)

    })
    socket.on('getTempHumid',(data)=>{
        data=JSON.parse(data)
        console.log(data)
        DeviceOut.findOne({"deviceId":data.deviceId}).then((d)=>{
            if(!d){
                socket.emit('ack','device not found check device ID')
                return false
            }
            dsend={temp:d.temp,humid:d.humid}
            socket.emit("tempHumid",JSON.stringify(dsend) )
        }).catch(err)
        

    })
    socket.on('getupdatebutton',(data)=>{
        data=JSON.parse(data)
        console.log(data)
        Devicein.findOne({"deviceId":data.deviceId}).then((d)=>{
            if(!d){
                socket.emit('ack','device not found check device ID')
                return false
            }
            dsend={'s0':d.s0,'s1':d.s1,'s2':d.s2,'s3':d.s3,'s4':d.s4,'s5':d.s5}
            console.log(d)
            socket.emit("updatebutton",JSON.stringify(dsend) )
        }).catch(err)
        

    })
   
 });

////end ws test


//footer connection/////////////////////////////////////////////////////////////
    mongoose.connect(MONGODB_URI)
    .then(result => {
        http.listen(process.env.PORT || 80, () => {
            console.log('80isUP!')
        });
    })
    .catch(err => {
        console.log(err);
    });
/////END//////////////////////////////////////////////////////////////////////