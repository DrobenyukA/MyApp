const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const production = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: path.resolve(__dirname, './src/js/app.js'),
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, "./dist")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /(node_modules)/

            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {   // Responsible for css loading
                            loader: 'css-loader',
                            options: {
                                minimize: production
                            }
                        },
                        {   // Responsible for sass compilation
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !production
                            }
                        }
                    ]
                }) //["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        // Responsible for cleaning dist folder
        new CleanWebpackPlugin(path.resolve(__dirname, "./dist"), {

            // Write logs to console.
            verbose: true,

            // Remove files on recompile.
            watch: true

        }),

        // Responsible for compiling index.html
        new HtmlWebpackPlugin({
            // The title to use for the generated HTML document
            title: "MyApp",

            // Path to template
            template: path.resolve(__dirname, "./src/html/index.ejs"),

            // Append a unique webpack compilation hash to all included scripts and CSS files
            hash: true,

            // If true enable minify the output
            // List of all available options https://github.com/kangax/html-minifier#options-quick-reference
            minify: production ? {

                collapseWhitespace: true,

                // Parse input according to HTML5 specifications
                html5: true,

                removeComments: true,

                removeEmptyAttributes: true

            } : false
        }),

        // Responsible for extracting styles into file
        new ExtractTextPlugin({
            //Name of the result file
            filename: 'styles/styles.css',

            // Disables the plugin
            disable: false,

            //Extract from all additional chunks
            allChunks: true
        }),

        // Responsible for collection all double scripts into one file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        })


    ],
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    }
};

if (production) {

    module.exports.plugins.push(
        // Responsible for uglify outputs
        new webpack.optimize.UglifyJsPlugin({
            // Disable sourcemap
            sourceMap: false
        })
    );

} else {

    module.exports.devtool = 'inline-source-map';

    module.exports.devServer = {

        // If true enables gzip compression
        compress: false,

        // Tell the server where to serve content from
        contentBase: path.join(__dirname, "./dist"),

        // Will open the browser
        open: false,

        // Specify a port number to listen for requests
        port: process.env.PORT || 8080

    };

}