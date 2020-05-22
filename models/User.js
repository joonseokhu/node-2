const  { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  name: { type: String },
  createdAt: { type: Date, default: Date.now() },
  // Articles: [{
  //   title: { type: String },
  //   content: { type: String },
  //   comments: [{
  //     content: String,
  //   }]
  // }],
  // Articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  // Comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
});

// 1. 도큐먼트가 최대 바이트 수 제한 ---->
// 2. 사용자별 글 목록, 사용자별 댓글목록 --- 사실상 불가능, 새로고침할때마다.
// 3. 시간순으로 모든 사용자의 글 보기 ----> 모든 사용자 조회 --> 모든 아티클을 조회 --> 작성시간에 따라 전체를 정렬 유저가 1000명, 500 ~ 1000, 새로고침할때마다

module.exports = model('User', UserSchema);