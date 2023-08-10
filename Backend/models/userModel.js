const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  profilePicture: String,
  coverPicture: String,
  about:String,
  livesIn: String,
  worksAt: String,
  country:String,
  relationShip:String,
  followers:[],// follower user
  following:[]
},
{timestamps: true}// it will add two field createdAt and updateAt on each document
)

const UserModel = mongoose.model('Users',userSchema);
module.exports = UserModel;