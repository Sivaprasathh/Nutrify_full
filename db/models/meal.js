const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  
  Name:{
    type:String
  },
  UserId: {
    type: String,
  },
  Meal:{
      type:String,
      required:true,
  },
  Calorie:{
    type:Number,
    required:true
  },
  Date:{
    type:String
  },
  Time:{
    type:String
  },
  
});

module.exports = mongoose.model("Meal", UserSchema);