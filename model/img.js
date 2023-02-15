const mongoose = require("mongoose");

const ImgSchema = mongoose.Schema(
  {
    Image: Buffer,
  },
  { collection: "Image" }
);

module.exports = mongoose.model("Image", ImgSchema);
