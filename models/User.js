const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Datastore = require("nedb-promise")
require("dotenv").config();
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
    },

    async auth(body) {
        const email = body.email;
        const password = body.password;
        const user = await users.findOne({email});

        //conditionals, checking if the user login creditendtials are correct or not then returns according to result.
        if (email !== user.email) {
            return false;
        } else {
            // if the email is correct, the next step will be to check if the passwords match and return true or false.
            const OK = await bcrypt.compare(password, user.password);
            if (OK) {
                const secret = process.env.SERCRET;
                const field = {
                    confirm: "confirm",
                    user: {
                        email: user.email,
                        name: user.name,
                        adress: {
                            street: user.adress.street,
                            city: user.adress.city,
                            zip: user.adress.zip
                        }
                    }
                };
                console.log("Buenos dias fuckboy");
                return jwt.sign(field, secret);

            } else {
                // if  email and password check returns are both wrong it will return false.
                return false;
            }
        }
    }
}   