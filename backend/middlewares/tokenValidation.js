const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const tokenValidation = async(req, res, next) => {
    const { TOKEN_SECRET_KEY } = process.env;
    const { authorization = "" } = req.headers;
    const [tokenType, token] = authorization.split(" ");

    // console.log(token)

    try {
        if (tokenType !== "Bearer") {
            throw new Error("Invalid tokenType");
        }
        const { user_id } = jwt.verify(token, TOKEN_SECRET_KEY);

        const user = await User.findById(user_id);



        if (user.length === 0 || !user.token === null) {
            throw new Error("Not authorized");

        }

        req.user = user;
        // console.log(req.user, "****************")

        next();
    } catch (error) {
        if (error.message === "Invalid sugnature") {
            error.status = 401;
        }
        next(error);
    }
};

module.exports = tokenValidation;