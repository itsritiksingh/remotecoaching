const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = Schema({
  start: {
    type: String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  startedBy: {
    type: Schema.Types.ObjectId, required: true,
    ref:'userModel'
  },
  isEnded: {
    type: Boolean
  }
})

const userSchema = Schema({
  name: { type: String, required: true },
  email:{ type: String, required: true },
  password: { type: String, required: true },
  meeting: [{  type: Schema.Types.ObjectId, ref: "meetingModel" }]

});

const meetingModel = mongoose.model("meetingModel", meetingSchema);
const userModel = mongoose.model("userModel", userSchema);

module.exports = {
  userModel,
  meetingModel,
};
