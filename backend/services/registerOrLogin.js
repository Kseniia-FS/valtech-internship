const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerOrLogin = async(user) => {

    const { name, email, password } = user;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        const correctPassword = await bcrypt.compare(password, isUserExist.password);
    }

}