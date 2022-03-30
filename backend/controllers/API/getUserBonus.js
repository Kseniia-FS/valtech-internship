const { getUserBonus } = require("../../services");

const getBonus = async(req, res) => {
    const { _id } = req.user;
    const user = await getUserBonus(_id);

    if (!user.bonus) {
        return res.status(404).json({ status: 404, message: "You don't have any bonus yet!" });
    }

    return res.status(200).json({
        data: user
    })
}

module.exports = getBonus;