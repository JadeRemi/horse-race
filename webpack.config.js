const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        app: ["./src/index.tsx"]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index.bundle.js",
    },
    devtool: "source-map",
    devServer: {
        port: 3010,
        liveReload: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]'
                }
            },
            // {
            //     test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]',
            //                 outputPath: 'fonts/'
            //             }
            //         }
            //     ]
            // }
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },

            // {
            //     test: /\.ttf$/,
            //     use: [
            //         {
            //             loader: 'ttf-loader',
            //             options: {
            //                 name: '[name].[ext]',
            //                 outputPath: 'fonts/'
            //             },
            //         },
            //     ]
            // }
            // {
            //     test: /\.(png|jpg|gif|svg)$/i,
            //     use: [
            //       {
            //         loader: 'url-loader',
            //         options: {
            //           limit: 8192,
            //         },
            //       },
            //     ],
            // }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/assets/images/icons/favicon.ico"
        }),
    ],
}