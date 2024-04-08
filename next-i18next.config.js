const path = require("path");
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "bm", "zh"],
  },
  localePath: path.resolve("./public/locales"),
};
