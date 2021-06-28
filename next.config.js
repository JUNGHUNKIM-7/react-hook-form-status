const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        SERVER: "http://localhost:3000",
        URL: `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@cluster0.ezqho.mongodb.net/${process.env.DB_DEV}?retryWrites=true&w=majority`,
        DB: `${process.env.DB_DEV}`,
        COLLECTION: `${process.env.DB_DEV_COLLECTION}`,
      },
      images: {
        domains: ["res.cloudinary.com"],
      },
    };
  }
  return {
    env: {
      SERVER: "Your Server",
      URL: `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@cluster0.ezqho.mongodb.net/${process.env.DB_PRODUCTION}?retryWrites=true&w=majority`,
      DB: `${process.env.DB_PRODUCTION}`,
      COLLECTION: `${process.env.DB_PRODUCTION_COLLECTION}`,
    },
    images: {
      domains: ["res.cloudinary.com"],
    },
  };
};
