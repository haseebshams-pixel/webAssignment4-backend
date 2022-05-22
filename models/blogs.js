const Joi = require("joi");
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  text: {
    type: String,
    min: 0,
    max: 255,
  },
  images: {
    type: [String],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    Default: Date.now,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

function validateBlog(user) {
  const schema = Joi.object({
    text: Joi.string().min(0).max(255),
    images: Joi.array().items(Joi.string()).min(0),
    postedBy: Joi.objectId().required(),
    date: Joi.date(),
  });
  return schema.validate(user);
}

module.exports.Blog = Blog;
module.exports.BlogSchema = BlogSchema;
module.exports.validate = validateBlog;
