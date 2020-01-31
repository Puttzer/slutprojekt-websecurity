const express = require('express');

const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Datastore = require("nedb-promise")
const users = new Datastore
    ({
        filename: "./users.db",
        autoload: true
    });


async function register(email, password, name, street, zip, city) {
    const newUser = {
        email: email,
        password: password,
        name: name,
        adress: {
            street: street,
            zip: zip,
            city: city
        }
    };
    return await users.insert({ newUser })
}

module.exports = { register }