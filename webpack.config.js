plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "public", "index.html"),
    favicon: "./public/favicon.ico",
    filename: "index.html",
    manifest: "./public/manifest.json",
  }),
];
