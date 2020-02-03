const DataStore = require("nedb-promise");

const Products = new DataStore({
    filename: "./db/products.db",
    autoload: true
});

async function all() {
    return await Products.find({});
};


//creating of a product

async function create(body) {
    const newProd = {
        _id: body.id,
        serial: body.serial,
        title: body.title,
        price: body.price,
        shortDesc: body.shortDesc,
        longDesc: body.longDesc,
        imgFile: body.imgFile
    }
    return await Products.insert(newProd);
}

module.exports = { all, create };