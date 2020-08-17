const path = require('path');

module.exports = {
	  entry: './src/index.ts',
	  module: {
		      rules: [
			            {
					            test: /\.tsx?$/,
					            use: 'ts-loader',
					            exclude: /node_modules/,
					          },
			          ],
		    },
	  resolve: {
		      extensions: [ '.tsx', '.ts', '.js' ],
		    },
	  output: {
		      filename: 'bundle.js',
		      path: path.resolve(__dirname, 'dist'),
		    },
  devServer: {
    host: "0.0.0.0",
    contentBase: path.join(__dirname, 'public'),
  },
};
