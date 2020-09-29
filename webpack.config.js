module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    node: {
        fs: "empty"
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: [
        '.ts', '.js',
      ],
    },
};