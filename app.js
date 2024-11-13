import express from 'express';
import session from 'express-session';
import {route} from './src/route/routes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config';



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(session({
    name : 'session',
    secret : 'rahadityaabimanyuputra',
    
}))
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(route);

app.listen(process.env.PORT, ()=> {
    console.log(`server is running on port ${process.env.PORT}`);
})