const User = require("../models/User");

const getUserBonus = async(id) => {
    const user = await User.findById(id);

    return user;
}

module.exports = getUserBonus;