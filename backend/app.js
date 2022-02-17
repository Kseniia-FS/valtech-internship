const path = require("path")

const express = require("express");
const cors = require("cors");
var hbs = require("express-hbs");
const compileSass = require('express-compile-sass');
const root = process.cwd();


const router = require("./routes/routes")


const app = express();


app.use(cors());
app.use(express.json());

app.use(compileSass({
    root: root,
    sourceMap: true,
    sourceComments: true,
    watchFiles: true,
    logToConsole: false,
}));

app.use(express.static("root"));
app.use(express.static("public"));


app.engine('hbs', hbs.express4({
    partialsDir: path.join(__dirname + '/src/views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/src/views'));

app.use("/", router);


app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});


module.exports = app;