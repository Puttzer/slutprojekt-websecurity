const express = require('express');

const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Datastore = require("nedb-promise")
const users = new Datastore
    ({
        filename: "./users.db",
        autoload: true
    });


module.exports = {
    async register(body) {
        //fields for creating a new user
        const passwordHash = await bcrypt.hash(body.password, 10);
        const newUser = {
            name: body.name,
            email: body.email,
            password: passwordHash,
            adress: {
                street: body.adress.street,
                zip: body.adress.zip,
                city: body.adress.city
            }
        }
        return await users.insert(newUser)
    }
}   