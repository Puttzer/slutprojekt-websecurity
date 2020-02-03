const DataStore = require("nedb-promise");

const Products = new DataStore({
    filename: "./db/products.db",
    autoload: true
});

async function all() {
    return await Products.find({});
};

module.exports = { all };