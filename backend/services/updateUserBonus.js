const User = require("../models/User");

const updateUserBonus = async(id, total) => {

    if (total >= 1000) {
        let bonus = 50;
        const user = await User.findById(id);
        user.bonus = bonus + user.bonus;
        user.save();

        return user.bonus;
    }

    return;
}

module.exports = updateUserBonus;