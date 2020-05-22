const  { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({ // 클래스, 객체생성자, 필드의 제약조건 등등
  title: { type: String, required: true },
  content: { type: String, required: true },
  sdsafs: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date },
  likes: [{type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = model('Article', ArticleSchema);