const Order = require("../models/Order");

const createNewOrder = async({ completed = true, products, totalSum, id }) => {

    const result = await Order({ completed, products, totalSum, owner: id });
    await result.save();

    return result;
}

module.exports = createNewOrder;