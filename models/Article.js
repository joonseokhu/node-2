const  { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date },
  likes: [{type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = model('Article', ArticleSchema);