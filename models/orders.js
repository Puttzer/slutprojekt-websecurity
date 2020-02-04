const Datastore = require("nedb-promise");
const orders = new Datastore({ filename: "./db/orders.db", autoload: true });


module.exports = {

    //get all orders

    async getOrders() {
        return await orders.find({});
    }
}