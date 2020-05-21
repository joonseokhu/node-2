const  { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  name: { type: String },
  createdAt: { type: Date, default: Date.now() },
  // Articles: [{
  //   title: { type: String },
  //   content: { type: String },
  // }],
  // Articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  // Comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
});



module.exports = model('User', UserSchema);