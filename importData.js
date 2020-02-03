const Datastore = require('nedb-promise')

const products = new Datastore({ filename: './db/products.db', autoload: true })

const jsonData = require('./products.json')

products.insert(jsonData)