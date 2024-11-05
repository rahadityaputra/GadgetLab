import express from 'express';
const app = express();

app.use((req, res) => {
    res.send('halo adit');
})

app.listen(3000, ()=> {
    console.log("server is running on port 3000");
})