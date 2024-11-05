import express from 'express';
import {route} from './src/route/routes.js';
import bodyParser from 'body-parser';



const app = express();
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(route);

app.listen(3000, ()=> {
    console.log("server is running on port 3000");
})