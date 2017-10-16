module.exports = {


    entry: "./app/app.js",
    output: {
        
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, 
              loader: 'babel',
              query: {
                presets: ['react', es2015]
              }

          }
        ]
    }
};