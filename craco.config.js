const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#be90cf",
              "@font-family": "Barlow",
              "@font-size-base": "16px",
            },

            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
