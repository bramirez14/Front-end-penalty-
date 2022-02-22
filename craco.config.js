const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#46a461",
              "@border-radius-base": "10px",
              "@font-family": "Comic Neue, cursive",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
