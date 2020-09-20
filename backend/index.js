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
    let statement = (SQL `
    SELECT *
    FROM toilets`);

    try {
        const { rows } = await db.query(statement);
        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send(error)
    }

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

app.post("/review/:toiletId", authenticateToken, async (req, res) => {
    const toiletId = req.params.toiletId;
    const userId = req.user.id;
    try {
        await addReviewFromUserToDb(userId, toiletId, review);
    } catch {
        return res.status(500).send('Error in adding reviews');
    }
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == nul) {
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

async function addReviewFromUserToDb(userId, toiletId, review) {
    let statement = SQL`
    INSERT 
    INTO reviews("user_id", "toilet_id", "cleanliness_rating", "title", "description", "queue")
    VALUES (${userId}, ${toiletId}, ${review.cleanlinessRating}, ${review.title}, ${review.description}, ${review.queue})`;

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