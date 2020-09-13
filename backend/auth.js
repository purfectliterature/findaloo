require('dotenv').config();

const db = require('./db');
const SQL = require('sql-template-strings');

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(express.json());

app.post('/sign-up/customer', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            roleId: 2,
            email: req.body.email,
            authType: req.body.authType,
            password: hashedPassword
        };

        const customerProfile = {
          userId: userId,
          name: req.body.name,
          profilePicture: req.body.profilePicture
        };

        try {
          await db.query("BEGIN");
          try {
            await addUserToDb(user);
          } catch (error) {
            client.query("ROLLBACK");
            console.log("client.query():", er);
            console.log("Transaction ROLLBACK called");
            return res.sendStatus(500);
          }
          statusCode = 200;
          if (req.body.authType === "native") {
            userInsertionResult = await Promise.all([
              addCustomerProfileToDb(customerProfile),
              addNativeAuthPasswordToDb({
                email: req.body.email,
                password: hashedPassword,
              })
            ]
            )
          } else {
            userInsertionResult = addCustomerProfileToDb(customerProfile);
          }

          userInsertionResult
            .then(result => {
              db.query("COMMIT");
              console.log("client.query() COMMIT row count:", result.rowCount);
            })
            .catch(error => {
              db.query("ROLLBACK");
              statusCode = 500;
              console.log(`Transaction ROLLBACK called, ${error}`);
            });
        } finally {
          db.release();
          console.log("Client is released");
        }
        res.sendStatus(statusCode);
    } catch {
        res.sendStatus(500);
    }
});

app.post("/sign-up/management", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const managementProfile = {
      roleId: 3,
      companyName: req.body.companyName,
      displayEmail: req.body.displayEmail,
      companyLogo: req.body.companyLogo,
      officeAddress: req.body.officeAddress,
      email: req.body.email,
      authType: req.body.authType,
      password: hashedPassword,
    };
    
    

    if (req.body.authType === "native") {
      Promise.all(
        addUserToDb(customerProfile),
        addNativeAuthPasswordToDb({
          email: req.body.email,
          password: hashedPassword,
        })
      );
    } else {
      await addCustomerProfileToDb(customerProfile);
    }
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await addRefreshTokenToDb(refreshToken);

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

async function addUserToDb(user) {
    let statement = SQL`
    INSERT 
    INTO users("role_id", "email", "auth_type")
    VALUES (${user.roleId}, ${user.email}, ${user.authType})`;

    await db.query(statement);
}

async function getLastUserId() {
    let statement = SQL`
    SELECT id
    FROM users
    ORDER BY id DESC
    LIMIT 1`;
    await db.query(statement);
}

async function addNativeAuthPasswordToDb(credentials) {
  let statement = SQL`
    INSERT 
    INTO native_auth_passwords
    VALUES (${credentials.email}, ${credentials.password})`;

  await db.query(statement);
}

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

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '60m'
    })
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

app.listen(4000);