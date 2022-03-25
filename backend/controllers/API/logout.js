const User = require("../../models/User");

const logout = async(req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id);

    if (!user) {
        res.status(401).json({ message: "No such user" });
    }

    user.token = null;
    await user.save();

    res.status(200).json({ message: "Successful logout" });
}

module.exports = logout;