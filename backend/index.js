const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const db = require('./db')
const SQL = require('sql-template-strings');

var AWS = require('aws-sdk'),
    region = "us-east-2",
    secretName = "arn:aws:secretsmanager:us-east-2:255459369867:secret:peepoo-token-secrets-5pGFfg",
    secret,
    decodedBinarySecret;

var client = new AWS.SecretsManager({
    region: region
});

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

app.post("/review/:toiletId", authenticateToken, async (req, res) => {
    const toiletId = req.params.toiletId;
    const userId = req.user.id;
    try {
        await addToiletReview(userId, toiletId, req.body);
    } catch (err) {
        return res.status(500).send('Error in adding reviews');
    }
    return res.sendStatus(200);
})

app.put("/review/:toiletId", authenticateToken, async (req, res) => {
    const toiletId = req.params.toiletId;
    const userId = req.user.id;
    try {
        await changeToiletReview(userId, toiletId, req.body);
    } catch (err) {
        return res.status(500).send('Error in editing reviews');
    }
    return res.sendStatus(200);
})

app.post("/report/:toiletId", authenticateToken, async (req, res) => {
    const toiletId = req.params.toiletId;
    const userId = req.user.id;
    try {
        await addToiletReport(userId, toiletId, req.body);
    } catch (err) {
        return res.status(500).send('Error in adding report');
    }
    return res.sendStatus(200);
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, tokenSecret.ACCESS_TOKEN_SECRET, (error, user) => {
            if (error) {
                console.log(error);
                return res.sendStatus(403);
            } 
            req.user = user;
            next();
        })
    
}

async function addToiletReview(userId, toiletId, review) {
    let statement = SQL`
    INSERT 
    INTO reviews("user_id", "toilet_id", "cleanliness_rating", "title", "description", "queue")
    VALUES (${userId}, ${toiletId}, ${review.cleanlinessRating}, ${review.title}, ${review.description}, ${review.queue});`;

    await db.query(statement);
} 

async function changeToiletReview(userId, toiletId, review) {
    let statement = SQL`
    UPDATE reviews
    SET
    cleanliness_rating= ${review.cleanlinessRating}, 
    title = ${review.title},
    description = ${review.description},
    queue = ${review.queue}
    WHERE
    user_id = ${userId}
    AND toilet_id = ${toiletId};`;

    await db.query(statement);
}

async function addToiletReport(userId, toiletId, report) {
    let statement = SQL`
    INSERT 
    INTO reports("user_id", "toilet_id", "issue", "items", "description")
    VALUES (${userId}, ${toiletId}, ${report.issue}, ${report.items.join(", ")}, ${report.description});`;

    await db.query(statement);
} 

async function getTokenSecrets() {
    try {
        var data = await client.getSecretValue({ SecretId: secretName }).promise();
        
        if ('SecretString' in data) {
            secret = data.SecretString;
            return secret;
        } else {
            let buff = Buffer.alloc(data.SecretBinary, 'base64');
            decodedBinarySecret = buff.toString('ascii');
            return decodedBinarySecret
        }
    } catch (err) {
        if (err) {
            throw err;
        }
    }
}

getTokenSecrets().then(data => {
    tokenSecret = data;
    tokenSecret = JSON.parse(tokenSecret)
    app.listen(port)

    console.log("Successfully initialised secret keys.")
    console.log(`Now listening on port ${port}.`)

}).catch(err => {
    console.log('Server init failed: ' + err);
})