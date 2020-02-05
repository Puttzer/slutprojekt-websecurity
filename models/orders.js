const Datastore = require("nedb-promise");
const orders = new Datastore({ filename: "./db/orders.db", autoload: true });
const users = new Datastore({ filename: "./users.db", autoload: true });


module.exports = {

    //get all orders

    async getOrders() {
        return await orders.find({});
    },

    async getAOrder(userID) {
        return await orders.find({ owner: userID });
    },


    //creates new order(stored in a object), stores it in a db
    async create(body, userID) {
        const order = {
            owner: userID,
            timeStamp: Date.now(),
            status: "InProcess ",
            items: body.items,
            orderValue: body.orderValue
        };

        // 
        const newOrder = await orders.insert(order);
        await users.update({
            _id: userID
        }, {
            $push: {
                orderHistory: newOrder._id
            }
        });
    }

}
