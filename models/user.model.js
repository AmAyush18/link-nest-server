import mongoose from "mongoose";

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;

const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
  description: {
    type: String,
  },
});

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
  links: [linkSchema],
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: {
        validator: function(value){
            return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  avatar: {
    type: String,
  },
  about: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  collections: [collectionSchema],
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);

export default userModel;
