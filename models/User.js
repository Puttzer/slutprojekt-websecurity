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
            role: "customer",
            adress: {
                street: body.adress.street,
                zip: body.adress.zip,
                city: body.adress.city
            },
            orderHistory: [],
            orderValue: []
        }
        return await users.insert(newUser)
    },

    async auth(body) {
        const email = body.email;
        const password = body.password;
        const user = await users.findOne({ email: body.email });

        //conditionals, checking if the user login creditendtials are correct or not then returns according to result.
        if (user) {

            // if the email is correct, the next step will be to check if the passwords match and return a true or false statement.
            const OK = await bcrypt.compare(password, user.password);
            console.log(OK);
            //if password is correct run this.
            if (OK) {

                const SECRET = process.env.SECRET;

                const payload = {
                    userID: user._id,
                    role: user.role,
                }

                //makin a token
                const token = jwt.sign(payload, SECRET)

                return {
                    token: token,
                    user: {
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        adress: {
                            street: user.adress.street,
                            city: user.adress.city,
                            zip: user.adress.zip
                        },
                        orderHistory: user.orderHistory,
                        orderValue: user.orderValue
                    }
                }


            } else {
                // Password check shows incorrections, return false
                return false;
            }
        } else {
            return false;
        }
    }

};   