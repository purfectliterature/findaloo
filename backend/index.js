const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const db = require('./db')

app.use(express.json());

app.get("/", (req, res) => res.send("Hello Agnes!"));

app.get("/toilets", (req, res) => {

});

app.get("/toilets/:toiletid", (req, res) => {
    const toiletid = parseInt(req.params.uid);
    
});


app.get("/toilets/nearest", (req, res) => {
    const {lat, lon, limit, offset} = req.body;

});

app.get("/toilets/search", (req, res) => {
    const {keyword, limit} = req.body;

});

app.listen(port, () => console.log(`Express is running at https://localhost:${port}!`));

function authenticateToken(req, res, next) {
    const authHeader = req.headers.['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == nul) {
        return res.sendStatus(401);
    }

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) {
            console.log(error);
            return res.sendStatus(403);
        } 

        req.user = user;
        next();
    })
    
}