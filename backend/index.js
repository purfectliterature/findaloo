const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const db = require('./db')
const SQL = require('sql-template-strings');

app.use(express.json());

app.get("/", (req, res) => res.send("Hello Agnes!"));


app.get("/toilets", async (req, res) => {

    let rows;

    let statement = (SQL `
    SELECT * 
    FROM buildings`);

    try {
        let result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    
    let buildings = {};

    for (row in rows) {
        let current = rows[row]
        let building = {
            buildingId: current.id,
            buildingName: current.name,
            region: current.region,
            lat: current.latitude,
            lon: current.longitude,
            toilets: new Array(),
        };

        buildings[building.buildingId] = building;
    }

    console.log(buildings[1]);

    statement = (SQL `
    SELECT *
    FROM ToiletSummary`);


    try {
        let result = await db.query(statement);
        rows = result.rows
    } catch (error) {
        return res.status(500).send(error);
    }

    for (row in rows) {
        let current = rows[row];
        console.log(current);
        let toilet = {
            toiletId: current.id,
            name: current.name,
            avg_review: (current.avg_review || 0),
            review_count: (current.review_count || 0),
        };

        let toilets = buildings[current.building_id].toilets;
        
        if (toilets) {
            toilets.push(toilet);
        }
    }

    return res.status(200).send(Object.values(buildings));


});

app.get("/toilets/:toiletid", async (req, res) => {
    const toiletid = parseInt(req.params.toiletid);

    console.log(toiletid);

    let statement = (SQL `
    SELECT *
    FROM toilets
    WHERE id = (${toiletid})`);

    try {
        const { rows } = await db.query(statement);
        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send(error)
    }

});


app.get("/toilets/nearest", (req, res) => {
    const {lat, lon, limit, offset} = req.body;

});

app.get("/toilets/search", (req, res) => {
    const {keyword, limit} = req.body;

});

app.listen(port, () => console.log(`Express is running at https://localhost:${port}!`));

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
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