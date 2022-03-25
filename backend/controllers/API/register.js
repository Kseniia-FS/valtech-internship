const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { TOKEN_SECRET_KEY } = process.env;

const registerOrLogin = async(req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,

        });

        const token = jwt.sign({ user_id: newUser._id },
            TOKEN_SECRET_KEY, { expiresIn: "2h" }
        );

        newUser.token = token;
        await newUser.save();

        return res.status(201).json({
            message: "Success register",
            data: { token: newUser.token, id: newUser._id }
        });

    } else {
        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(401).json({ message: "Неправильный логин или пароль", status: 401 });
        }

        const token = jwt.sign({ user_id: user._id },
            TOKEN_SECRET_KEY, { expiresIn: "2h" }
        );

        user.token = token;
        await user.save();

        return res.status(200).json({
            message: "Success login",
            data: { token: user.token, id: user._id }
        });
    }
}

module.exports = registerOrLogin;