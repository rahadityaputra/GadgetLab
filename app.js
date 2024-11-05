import express from 'express';

const app = express();


app.set('views', './views');
app.set('view engine', 'ejs');
app.use("/",(req, res) => {
    // res.send('halo adit');
    res.render('login');
})

app.listen(3000, ()=> {
    console.log("server is running on port 3000");
})