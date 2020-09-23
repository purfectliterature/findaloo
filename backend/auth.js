require('dotenv').config();

const db = require('./db');
const SQL = require('sql-template-strings');
const port = process.env.PORT || 4000;

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { google } = require('googleapis');
const cors = require('cors')

const fs = require('fs');
const https = require('https');

const privateKey = fs.readFileSync('./cert/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./cert/cert.pem', 'utf8');
const ca = fs.readFileSync('./cert/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

var tokenSecret;
var AWS = require('aws-sdk'),
    region = "us-east-2",
    secretName = "arn:aws:secretsmanager:us-east-2:255459369867:secret:peepoo-token-secrets-5pGFfg",
    secret,
    decodedBinarySecret;

var client = new AWS.SecretsManager({
    region: region
});

app.use(express.json());
app.use(cors());

app.post('/sign-up/customer', async (req, res) => {
  try {
    const { email, password, authType } = req.body;
    const { name, profilePicture } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        roleId: 2,
        email: email,
        authType: authType,
        password: hashedPassword,
    };

    try {
        await db.query("BEGIN");
        let statement = SQL`
            INSERT 
            INTO users("role_id", "email", "auth_type")
            VALUES (${user.roleId}, ${user.email}, ${user.authType})`;
        await db.query(statement);
    } catch (error) {
        console.log("db.query():", error);
        console.log("Transaction ROLLBACK called");
        await db.query("ROLLBACK");
        return res.status(409).send('User already exist');
    }

    // Need to handle profile photo before saving to DB!

    try {
        const lastRow = await getLastUserId();
        const lastUserId = lastRow.rows[0].id;
      
        const customerProfile = {
            userId: lastUserId,
            name: name,
            profilePicture: profilePicture
        };

        if (req.body.authType === "native") {
          await addCustomerProfileToDb(customerProfile);
          await addNativeAuthPasswordToDb({
              email: email,
              authType: authType,
              password: hashedPassword,
          });
        } else {
          await addCustomerProfileToDb(customerProfile)
        }

        await db.query("COMMIT");

    } catch (error) {
        console.log("db.query():", error);
        console.log("Transaction ROLLBACK called");
        await db.query("ROLLBACK");
        return res.status(500).send('Error in adding user');
    }

    return res.sendStatus(200);

  } catch {
        res.status(500).send('Error in adding user');
  }
});

app.post("/sign-up/management", async (req, res) => {
    try {
        const { email, password, authType } = req.body;
        const { companyName, displayEmail, companyLogo, officeAddress } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            roleId: 3,
            email: email,
            authType: authType,
            password: hashedPassword,
        };

    try {
        await db.query("BEGIN");
        let statement = SQL`
            INSERT 
            INTO users("role_id", "email", "auth_type")
            VALUES (${user.roleId}, ${user.email}, ${user.authType})`;
        await db.query(statement);
    } catch (error) {
        console.log("db.query():", error);
        console.log("Transaction ROLLBACK called");
        await db.query("ROLLBACK");
        return res.status(409).send('User already exist');
    }
    
    try {
        const lastRow = await getLastUserId();
        const lastUserId = lastRow.rows[0].id;
        const managementProfile = {
            userId: lastUserId,
            companyName: companyName,
            displayEmail: displayEmail,
            companyLogo: companyLogo,
            officeAddress: officeAddress,
        };
        
      if (req.body.authType === "native") {
        await addManagementProfileToDb(managementProfile);
        await addNativeAuthPasswordToDb({
            email: req.body.email,
            authType: req.body.authType,
            password: hashedPassword,
        });
      } else {
        await addManagementProfileToDb(managementProfile);
      }
      await db.query("COMMIT");

    } catch (error) {
        console.log("db.query():", error);
        console.log("Transaction ROLLBACK called");
        await db.query("ROLLBACK");
        return res.status(500).send('Error in adding user');
    }
    
    return res.sendStatus(200);

  } catch {
    res.status(500).send('Error in adding user');
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let result;

    try {
        let statement = SQL`
        SELECT password
        FROM native_auth_passwords
        WHERE email = ${email}`;

        result = await db.query(statement);
    } catch (err) {
        return res.status(500).send('Error retrieving user');
    }

    if (!result.rowCount) {
        return res.status(404).send('No such user found');
    }
    let hashedPassword = result.rows[0].password;

    if (!hashedPassword) {
        return res.status(404).send('No such user found');
    }

    const valid = await bcrypt.compare(password, hashedPassword)

    if (!valid) {
        return res.status(401).send('Incorrect password');
    }

    let userId;

    try {
        let statement = SQL`
        SELECT id
        FROM users
        WHERE email = ${email}
        AND auth_type = 'native'`;

        result = await db.query(statement);
        userId = result.rows[0].id;
    } catch (err) {
        return res.status(500).send('Error retrieving user');
    }

    try {
        const user = {
            id: userId,
            email: email,
            authType: 'native',
        };

        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        await addRefreshTokenToDb(refreshToken);

        return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        });
    } catch (err) {
        return res.sendStatus(500);
    }
});

app.delete('/logout', async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(403);
        }
        await removeRefreshTokenFromDb(refreshToken);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
})

app.post('/token', async (req, res) => {
  const refreshToken = req.body.refreshToken;
  
  if (!refreshToken) {
      return res.status(401).send('No refresh token');
  }

  let exist = await checkIfRefreshTokenExists(refreshToken);

  if (!exist) {
      return res.status(403).send('Invalid refresh token');
  }

  let user = jwt.verify(refreshToken, tokenSecret.REFRESH_TOKEN_SECRET)

  if (user) {
      const accessToken = await generateAccessToken(user)
      res.status(200).json({
          accessToken: accessToken,
      });
  } else {
      res.status(403).send('Invalid refresh token')
  }

})

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

async function getLastUserId() {
    let statement = SQL`
    SELECT id
    FROM users
    ORDER BY id DESC
    LIMIT 1`;
    return db.query(statement);
}

async function addCustomerProfileToDb(customerProfile) {
    let statement = SQL`
        INSERT 
        INTO customer_profiles("user_id", "name", "profile_picture")
        VALUES (${customerProfile.userId}, ${customerProfile.name}, ${customerProfile.profilePicture})`;

    await db.query(statement);
} 

async function addManagementProfileToDb(managementProfile) {
    let statement = SQL`
        INSERT 
        INTO management_profiles
        VALUES (
        ${managementProfile.userId},
        ${managementProfile.companyName},
        ${managementProfile.displayEmail},
        ${managementProfile.companyLogo},
        ${managementProfile.officeAddress}
        )`;

    await db.query(statement);
}

async function addNativeAuthPasswordToDb(credentials) {
    let statement = SQL`
        INSERT 
        INTO native_auth_passwords
        VALUES (${credentials.email}, ${credentials.authType}, ${credentials.password})`;

    await db.query(statement);
}

async function checkIfRefreshTokenExists(token) {
    let statement = (SQL `
    SELECT *
    FROM refresh_tokens R
    WHERE R.token = ${token}`);

    const { rows } = await db.query(statement)

    if (rows[0]?.token && rows[0].token === token) {
        return true;
    }
    
    return false;

}

async function addRefreshTokenToDb(token) {
    let statement = (SQL `
    INSERT 
    INTO refresh_tokens
    VALUES (${token})`);

    try {
        await db.query(statement)
    } catch (err) {
        if (err.code !== '23505') {
            console.log(err);
        }
    }
}

async function removeRefreshTokenFromDb(token) {
    let statement = (SQL `
    DELETE 
    FROM refresh_tokens
    WHERE token = (${token})`);

    try {
        await db.query(statement);
    } catch (err) {
        console.log(err)
    }

    return true;
}


async function generateAccessToken(user) {
    return jwt.sign(user, tokenSecret.ACCESS_TOKEN_SECRET, {
        expiresIn: '60m'
    })
}

async function generateRefreshToken(user) {
    return jwt.sign(user, tokenSecret.REFRESH_TOKEN_SECRET)
}

function createGoogleConnection(redirect) {
    return new google.auth.OAuth2(
        tokenSecret.GOOGLE_AUTH_CLIENT_ID,
        tokenSecret.GOOGLE_AUTH_SECRET_KEY,
        redirect
    );
}

app.get('/google/sign-in-url', (req, res) => {
    let { redirect } = req.body;

    let url = generateGoogleLoginUrl(redirect);

    res.status(200).send(url);
})


function generateGoogleLoginUrl(redirect) {
    const auth = createGoogleConnection(redirect);
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
        ]
    })
}

app.post('/google/exchange-token', async (req, res) => {
    const { token } = req.body;

    let email = await getGoogleEmail(token);

    let statement = (SQL `
    SELECT id
    FROM users
    WHERE email = (${email})
    AND auth_type = 'google'`)

    let result = await db.query(statement);
    let rows = result.rows;

    if (rows.length == 0) {

    } else {
        let userId = rows[0].id;

        const user = {
            id: userId,
            email: email,
            authType: 'google',
        };

        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        await addRefreshTokenToDb(refreshToken);

        return res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    }

})

async function getGoogleEmail(token) {
    const auth = createGoogleConnection();
    auth.setCredentials(tokens);

    const data = await auth.getToken(code);
    const tokens = data.tokens;

    const plus = google.plus({
        version: 'v1',
        auth
    })

    const me = await plus.people.get({
        userId: 'me'
    });

    return email = me.data.emails && me.data.emails.length && me.data.emails[0].value;
}


getTokenSecrets().then(data => {
    tokenSecret = data;
    tokenSecret = JSON.parse(tokenSecret)
    console.log("Successfully initialised secret keys.")

    let httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port);
    console.log("Now listening on port 4000.")

}).catch(err => { 
    console.log('Server init failed: ' + err)
})
