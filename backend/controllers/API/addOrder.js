const { createNewOrder, updateUserBonus } = require("../../services");

const addOrder = async(req, res) => {
    const { completed, products, totalSum, id } = req.body;

    const newOrder = await createNewOrder({ completed, products, totalSum, id });
    const userBonus = await updateUserBonus(id, totalSum);


    res.status(200).json({
        message: "Succes",
        data: newOrder,
        bonus: userBonus
    })
}

module.exports = addOrder;