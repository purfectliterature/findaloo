const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db')
const SQL = require('sql-template-strings');
const fetch = require("node-fetch");
const constants = require("./constants.js");

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

    let toiletFeatures = await getToiletFeatures('');
    let toiletImages = await getToiletImages('');

    for (row in rows) {
        let current = rows[row];
        let toilet = {
            toiletId: current.id,
            buildingId: current.building_id,
            address: current.address,
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

async function getToiletFeatures(condition) {
    let toilet_features = {}
    let statement = "SELECT * FROM toilet_features " + condition;
    let rows;
    try {
        let result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        throw error;
    }

    for (row in rows) {
        let current = rows[row];
        toilet_features[current.toilet_id] = parseToiletFeatures(current)
    }

    return toilet_features;
}

function parseToiletFeatures(row) {
    return {
        is_free: row.is_free,
        has_handheld_bidet: row.has_handheld_bidet,
        has_seat_bidet: row.has_seat_bidet,
        has_toilet_paper: row.has_toilet_paper,
        has_seat_cleaner: row.has_seat_cleaner,
        has_handicap: row.has_handicap,
        has_water_heater: row.has_water_heater,
        has_hand_dryer: row.has_hand_dryer,
        has_hand_soap: row.has_hand_soap,
        has_baby_change_station: row.has_baby_change_station,
        has_female: row.has_female,
        has_male: row.has_male,
    }
}

async function getToiletImages(condition) {
    let toilet_images = {}

    let rows;
    let statement = "SELECT * FROM toilet_images " + condition;

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

app.get('/toilets/:toiletId([0-9]+)', async (req, res) => {
    const toiletId = parseInt(req.params.toiletId);
    let rows;

    // Retrieve toilet data
    let statement = SQL`
            SELECT *
            FROM ToiletSummary
            WHERE id = (${toiletId})`;

    try {
        result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        res.status(500).send(error);
    }

    let toilet = rows[0];

    // Retrieve features
    statement = SQL`
            SELECT *
            FROM toilet_features
            WHERE toilet_id = (${toiletId})`;

    try {
        result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        res.status(500).send(error);
    }

    let features = parseToiletFeatures(rows[0]);

    // Retrieve reviews
    let reviews = [];

    statement = SQL`
            SELECT *
            FROM ReviewSummary
            WHERE toilet_id = (${toiletId})`;

    try {
        result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        res.status(500).send(error);
    }

    for (row in rows) {
        let current = rows[row];
        reviews.push({
        name: current.name,
        profile_picture_url: current.profile_picture_url,
        cleanliness_rating: current.cleanliness_rating,
        title: current.title,
        description: current.description,
        queue: current.queue,
        });
    }

    // Retrieve images;
    let images = [];

    statement = SQL`
            SELECT *
            FROM toilet_images
            WHERE toilet_id = (${toiletId})`;

    try {
        result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        res.status(500).send(error);
    }

    for (row in rows) {
        let current = rows[row];
        images.push(current.image_url);
    }

    // Retrieve certifications
    let certifications = [];

    statement = SQL`
            SELECT *
            FROM CertificationSummary
            WHERE toilet_id = (${toiletId})`;

    try {
        result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        res.status(500).send(error);
    }

    for (row in rows) {
        let current = rows[row];
        certifications.push({
        certification_authority: current.certification_authority,
        certification_logo: current.certification_logo,
        certification_webpage: current.certification_webpage,
        rating: current.rating,
        });
    }

    let data = {
        toiletName: toilet.name,
        avg_review: toilet.avg_review,
        review_count: toilet.review_count,
        distance: 0,
        features: features,
        reviews: reviews,
        toilet_images: images,
        certifications: certifications,
    };

    return res.status(200).send(data);
});


app.get("/toilets/nearest", async (req, res) => {
    const { lat, lon } = req.body;

    var nearestToilets = await getNearestToilets(lat, lon);
    var toiletIds = nearestToilets.map(nearestToilet => nearestToilet.toiletId).join(',');
    statement = (`
    SELECT *
    FROM ToiletSummary
    WHERE id IN (${toiletIds})
    `);

    let toilets = [];

    try {
        let result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        throw error;
    }

    let toiletFeatures = await getToiletFeatures(`WHERE toilet_id IN (${toiletIds})`);
    let toiletImages = await getToiletImages(`WHERE toilet_id IN (${toiletIds})`);

    for (row in rows) {
        let current = rows[row];
        let toilet = {
            toiletId: current.id,
            buildingId: current.building_id,
            address: current.address,
            name: current.name,
            avg_review: (current.avg_review || 0),
            review_count: (current.review_count || 0),
            toilet_features: toiletFeatures[current.id],
            toilet_images: toiletImages[current.id],
        };
        toilets.push(toilet);
    }

    return res.status(200).send(toilets);
});

app.get("/toilets/search", async (req, res) => {
    const {keyword, limit} = req.body;
    
    try {
        let toilets = await getToiletSummary();
        return res
          .status(200)
          .send(toilets.filter(
            (toilet) =>
              toilet.name.includes(keyword) || toilet.address.includes(keyword)
          )
          .slice(0, limit));
    } catch {
        res.status(500).send('Error in searching toilets');
    }
});

app.post("/review/:toiletId", authenticateToken, async (req, res) => {
    const toiletId = req.params.toiletId;
    const userId = req.user.id;
    try {
        await addToiletReview(userId, toiletId, req.body);
    } catch (err) {
        return res.status(500).send('Error in creating review');
    }
    return res.sendStatus(200);
})

app.put("/review/:toiletId", authenticateToken, async (req, res) => {
    const toiletId = req.params.toiletId;
    const userId = req.user.id;
    try {
        await changeToiletReview(userId, toiletId, req.body);
    } catch (err) {
        return res.status(500).send('Error in editing review');
    }
    return res.sendStatus(200);
})

app.post("/report/:toiletId", authenticateToken, async (req, res) => {
    const toiletId = req.params.toiletId;
    const userId = req.user.id;
    try {
        await addToiletReport(userId, toiletId, req.body);
    } catch (err) {
        return res.status(500).send('Error in creating report');
    }
    return res.sendStatus(200);
})

app.get("/customer/profile", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    let row;

    const statement = (SQL `
    SELECT *
    FROM CustomerSummary
    WHERE id = (${userId})`);

    try {
        let result = await db.query(statement);
        row = result.rows;
    } catch (error) {
        return res.status(500).send(error);
    }

    return res.status(200).json(row[0])
})

app.put("/customer/profile", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { name, profile_picture } = req.body;

    statement = (SQL `
    UPDATE customer_profiles
    SET name = (${name}), profile_picture = (${profile_picture})
    WHERE user_id = (${userId})
    `)

    await db.query(statement);

    return res.sendStatus(200);
})

app.get("/customer/reviews", authenticateToken, async (req, res) => {
    let userId = req.user.id;
    let reviews = [];
    let rows = null;

    changePasswordStatement = SQL`
            SELECT *
            FROM ReviewSummary
            WHERE email = (${userEmail})`;

    try {
        result = await db.query(changePasswordStatement);
        rows = result.rows;
    } catch (error) {
        res.status(500).send(error);
    }

    for (row in rows) {
        let current = rows[row];
        reviews.push({
            name: current.name,
            profile_picture_url: current.profile_picture_url,
            cleanliness_rating: current.cleanliness_rating,
            title: current.title,
            description: current.description,
            queue: current.queue,
        });
    }
    return res.status(200).send(reviews);
})

app.put("/customer/change-password", authenticateToken, async (req, res) => {
    let userId = req.user.id;
    let newPassword = req.body.newPassword;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    let userEmail = null;
    getEmailFromId = SQL`
            SELECT email
            FROM users
            WHERE id = ${userId}`
    try {
        result = await db.query(getEmailFromId);
        userEmail = result.rows[0].email;
    } catch (err) {
        return res.status(500).send('Error retrieving user');
    }

    statement = SQL`
            UPDATE
            native_auth_passwords
            SET password = ${hashedPassword}
            WHERE email = (${userEmail})`;

    try {
        result = await db.query(statement);
        rows = result.rows;
    } catch (error) {
        return res.status(500).send(error);
    }
    return res.sendStatus(200);
});

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

    statement = (SQL `
    UPDATE customer_profiles
    SET points = points + 15;
    WHERE user_id = (${userId})
    `)

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

    statement = (SQL `
    UPDATE customer_profiles
    SET points = points + 10;
    WHERE user_id = (${userId})
    `)

    await db.query(statement);
} 

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


async function getNearestToilets(lat, lon) {
    var idAndLatLons = constants.idAndLatLons;
    // list of all lat lons from db, sort it according to approximated distance
    idAndLatLons = idAndLatLons.sort(function (
      currentIndexLatLon,
      nextIndexLatLon
    ) {
      var currentLatlon = currentIndexLatLon[1];
      var nextLatLon = nextIndexLatLon[1];
      return (
        getDistanceFromLatLonInKm(
          currentLatlon[0],
          currentLatlon[1],
          lat,
          lon
        ) - getDistanceFromLatLonInKm(nextLatLon[0], nextLatLon[1], lat, lon)
      );
    });

    // join the string for query to google maps API
    var destinationsString = idAndLatLons
      .slice(0, 25)
      .map(function (latLon) {
        return latLon[1];
      })
      .join("|");
        ;
    console.log(destinationsString)
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lon}&destinations=${destinationsString}&mode=walking&key=${tokenSecret.GOOGLE_MAPS_API_KEY}`;
    var response = await fetch(url);
    var response_json = await response.json();
    // result from the google maps API, put index besides it
    var indexAndActualDistances = response_json.rows[0].elements.map(function (el, i) {
      return { index: i, value: el };
    });
    
    // sort the result using the duration 
    indexAndActualDistances.sort(
      (currentDistanceDuration, nextDistanceDuration) => {
        return (
          currentDistanceDuration.value.duration.value -
          nextDistanceDuration.value.duration.value
        );
      }
    );

    // from the sorted, get the index and get the original id and lat lon from the unsorted array
    var result = indexAndActualDistances.map(function (indexAndActualDistance) {
        var indexAndLatLon = idAndLatLons[indexAndActualDistance.index];
        return {
            toiletId: indexAndLatLon[0],
            latLon: indexAndLatLon[1],
            distance: indexAndActualDistance.value.distance.value,
            duration: indexAndActualDistance.value.duration.value,
        };
    });

    // result in the form of [{toiletId: .., latLon: [ .., .. ], distance: .., duration: ..}]
    return result;
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