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

async function get(id) {
    return await Products.findOne({ _id: id });
};

async function patch(id, body) {
    let product = await Products.findOne({ _id: id });
    product = await Products.update(product, { $set: body })
    return product;
};

async function remove(id) {
    return await Products.remove({ _id: id });
};

module.exports = { all, create, get, patch, remove };