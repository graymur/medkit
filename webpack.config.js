var webpack = require('webpack');

module.exports = {
    entry: [
        './_src/js/constructor/constructor.jsx'
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']/*,
                plugins: ['transform-es3-member-expression-literals', 'transform-es3-property-literals']*/
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/js',
        publicPath: '/',
        filename: 'constructor.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
};