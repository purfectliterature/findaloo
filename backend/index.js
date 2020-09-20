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

    try {
        let buildings = await getBuildings();

        let toilets = await getToiletSummary();
    
        for (toilet in toilets) {
            let currentToilet = toilets[toilet];
            let currentBuildingToilets = buildings[currentToilet.buildingId].toilets;
            if (currentBuildingToilets) {
                currentBuildingToilets.push(currentToilet);
            }
        }
    
        return res.status(200).send(Object.values(buildings));
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

});

async function getBuildings() {
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
            address: current.address,
            lat: current.latitude,
            lon: current.longitude,
            toilets: new Array(),
        };

        buildings[building.buildingId] = building;
    }

    return buildings;
}

async function getToiletSummary() {
    let rows;
    statement = (SQL `
    SELECT *
    FROM ToiletSummary`);

    let toilets = [];

    try {
        let result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        throw error;
    }

    let toiletFeatures = await getToiletFeatures();
    let toiletImages = await getToiletImages();

    for (row in rows) {
        let current = rows[row];
        let toilet = {
            toiletId: current.id,
            buildingId: current.building_id,
            name: current.name,
            avg_review: (current.avg_review || 0),
            review_count: (current.review_count || 0),
            toilet_features: toiletFeatures[current.id],
            toilet_images: toiletImages[current.id],
        };
        toilets.push(toilet);
    }

    return toilets;
}

async function getToiletFeatures() {
    let toilet_features = {}

    let rows;
    let statement = (SQL `
    SELECT * 
    FROM toilet_features`);

    try {
        let result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        throw error;
    }

    for (row in rows) {
        let current = rows[row];
        toilet_features[current.toilet_id] = {
            is_free: (current.is_free == 't' ? true : false),
            has_handheld_bidet: (current.has_handheld_bidet == 't' ? true : false),
            has_seat_bidet: (current.has_seat_bidet == 't' ? true : false),
            has_toilet_paper: (current.has_toilet_paper == 't' ? true : false),
            has_seat_cleaner: (current.has_seat_cleaner == 't' ? true : false),
            has_handicap: (current.has_handicap == 't' ? true : false),
            has_water_heater: (current.has_water_heater == 't' ? true : false),
            has_hand_dryer: (current.has_hand_dryer == 't' ? true : false),
            has_hand_soap: (current.has_hand_soap == 't' ? true : false),
            has_baby_change_station: (current.has_baby_change_station == 't' ? true : false),
            has_female: (current.has_female == 't' ? true : false),
            has_male:(current.has_male == 't' ? true : false),
        }
    }

    return toilet_features;
}

async function getToiletImages() {
    let toilet_images = {}

    let rows;
    let statement = (SQL `
    SELECT * 
    FROM toilet_images`);

    try {
        let result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        throw error;
    }

    for (row in rows) {
        let current = rows[row];
        if (Array.isArray(toilet_images[current.toilet_id])) {
            toilet_images[current.toilet_id].push(current.image_url)
        } else {
            toilet_images[current.toilet_id] = [];
            toilet_images[current.toilet_id].push(current.image_url)
        }
    }

    return toilet_images;
}

app.get("/toilets/:toiletid", async (req, res) => {
    const toiletid = parseInt(req.params.toiletid);


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