import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import {route} from './src/route/routes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(session({
    secret : 'rahadityaabimanyuputra',
    resave : false,
    saveUninitialized : false,
}))

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(flash());

app.use((req, res, next) => {
    console.log('test woy');
    if(req.session.user) {
        console.log('wis login bro');
        console.log(req.session.user);
        next()
    } else {
        next();
    }

 })
app.use(route);
 

app.listen(process.env.PORT, ()=> {
    console.log(`server is running on port ${process.env.PORT}`);
})