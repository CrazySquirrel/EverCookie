"use strict";

const NODE_ENV = process.env.NODE_ENV || "development";

const MODE = NODE_ENV.split(":")[0];

const StringReplacePlugin = require("string-replace-webpack-plugin");

const WebpackNotifierPlugin = require("webpack-notifier");

const CleanWebpackPlugin = require("clean-webpack-plugin");

const path = require("path");

const webpack = require("webpack");

const fs = require("fs");

const crypto = require("crypto");

const packagenpm = require("./package.json");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

let extractHTML = new ExtractTextPlugin("[name].html");

/**
 * Plugins list
 */
let arrPlugins = [
  new WebpackNotifierPlugin(),
  new StringReplacePlugin(),
  extractHTML
];
/**
 * Add uglifyer for production mode
 */
if (MODE === "production" || MODE === "testing") {
  arrPlugins.push(
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: false,
        output: {
          comments: false
        },
        compressor: {
          warnings: false
        }
      })
  );
}
/**
 * Add additional plugins
 */
arrPlugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(MODE)
    })
);

arrPlugins.push(
    new CleanWebpackPlugin([
      "./dist"
    ])
);

let replacements = StringReplacePlugin.replace({
  replacements: [
    {
      pattern: /#HASH#/gi,
      replacement: () => {
        return crypto.createHash("md5").update(
            (new Date()).getTime().toString()).digest("hex");
      }
    },
    {
      pattern: /#PACKAGE_NAME#/gi,
      replacement: () => {
        return packagenpm.name;
      }
    },
    {
      pattern: /#PACKAGE_VERSION#/gi,
      replacement: () => {
        return packagenpm.version;
      }
    }
  ]
});

module.exports = {
  output: {
    filename: MODE === "production" ? "[name].js" : "[name].js",
    library: "EverCookie",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: {
    "EverCookie": "EverCookie"
  },
  devtool: (
      MODE === "development" ? "inline-source-map" : (
          MODE === "testing" ? "inline-source-map" : ""
      )
  ),
  plugins: arrPlugins,
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  resolveLoader: {
    extensions: [".js", ".ts", ".jsx", ".tsx"]
  },
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        include: [
          path.resolve(__dirname, "lib")
        ],
        use: [
          {
            loader: replacements
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015"],
              plugins: ["istanbul"]
            }
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: [
          path.resolve(__dirname, "lib")
        ],
        use: [
          {
            loader: replacements
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015"]
            }
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.html/i,
        use: extractHTML.extract(["html-loader"])
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: replacements
          },
          {
            loader: "json-loader"
          }
        ]
      }
    ]
  }
};