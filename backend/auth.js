require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

app.use(express.json());

const sequelize = new Sequelize('postgres://a3:password@localhost:5432/a3')


async function test() {
    try {
        await sequelize.authenticate();
        console.log("it worked!");
    } catch (error) {
        console.log(error);
    }
}

test();

