const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const isDev = process.env.NODE_ENV === 'development'

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    const loaders = [{
            loader: MiniCssExtractPlugin.loader,

        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-transform-runtime'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}


const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]


    return loaders
}



module.exports = {
    context: path.join(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './js/index.js'],
        modal: "./js/modal.js",
        addToCartFromThumbs: "./js/addToCartFromThumbs.js",
        quantity: "./js/quantity.js",
        shoppingCart: "./js/shoppingCart.js",
        addToCartFromPDP: "./js/addToCartFromPDP.js",
        register: "./js/register.js",
        checkout: "./js/checkout.js",
        search: "./js/search.js",
        filter: "./js/filter.js",
        mobileMenu: "./js/mobileMenu.js",
        favorite: "./js/addToFavorite.js",
        compare: "./js/addToCompare.js",
        favoriteList: "./js/favorite.js",
        compareList: "./js/compare.js",
        currency: "./js/currency.js",
        backToTop: "./js/backToTop.js"

    },
    output: {
        filename: filename('js'),
        path: path.join(__dirname, 'public', 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.scss'],
    },



    plugins: [

        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-env')
                }
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
}