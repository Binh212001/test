const userRoute = require("./user.route");
const cartRoute = require("./cart.route");
const categoryRoute = require("./category.route");
const uploadRoute = require("./uploadRoute");

const productRouter = require("./product.route");

const useRoute = (app) => {
  app.use("/api/v1/auth", userRoute);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/cart", cartRoute);
  app.use("/api/v1/category", categoryRoute);
  app.use("/api/v1", uploadRoute);
};

module.exports = useRoute;
