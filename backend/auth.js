require('dotenv').config();

const db = require('./db');
const SQL = require('sql-template-strings');

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await addRefreshTokenToDb(refreshToken)

    res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
    });
});

app.delete('/logout', (req, res) => {
    removeRefreshTokenFromDb(token);
    res.sendStatus(204);
})

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    
    if (refreshToken == null) {
        return res.sendStatus(401);
    }

    if (!checkIfRefreshTokenExists(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.sendStatus(403);
        }

        const accessToken = generateAccessToken(user)
        res.json({
            accessToken: accessToken,
        });
    })

})

async function checkIfRefreshTokenExists(token) {
    let statement = (SQL `
    SELECT *
    FROM refresh_tokens R
    WHERE R.token = ${token}`);

    const { rows } = await db.query(statement)

    if (rows[0].token === token) {
        return true;
    }
    
    return false;

}

async function addRefreshTokenToDb(token) {
    let statement = (SQL `
    INSERT 
    INTO refresh_tokens
    VALUES (${token})`);

    const { error } = await db.query(statement)

    if (error) {
        return false;
    }

    return true;
}

async function removeRefreshTokenFromDb(token) {
    let statement = (SQL `
    DELETE 
    FROM refresh_tokens
    WHERE token = (${token})`);

    const { error } = await db.query(statement)

    if (error) {
        return false;
    }

    return true;
}

async function testFunction() {
    let answer = await removeRefreshTokenFromDb('12345');
    console.log(answer);
}

testFunction();

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '60m'
    })
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

