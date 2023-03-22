const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
module.exports = Mongoose.model("categories", CategorySchema);
