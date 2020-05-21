const Article = require('../models/Article')

exports.createArticle = data => {
  const { title, content, user } = data;
  return Article.create({
    title,
    content,
    createdBy: user,
  });
};

exports.updateArticle = async data => {
  const { id, title, content, user } = data;
  const prev = await Article.findOne({ _id: id });
  if (!prev) {
    return Promise.reject('게시물이 없습니다.')
  }
  if (prev.createdBy !== user.id) {
    return Promise.reject('본인이 아닙니다.')
  };
  return Article.findOneAndUpdate(
    { _id: id },
    {
      title,
      content,
    }
  );
}

exports.deleteArticle = async data => {
  const { id, user } = data;
  const prev = await Article.findOne({ _id: id });
  if (!prev) {
    return Promise.reject('게시물이 없습니다.')
  }
  if (prev.createdBy !== user.id) {
    return Promise.reject('본인이 아닙니다.')
  };
  return Article.deleteOne({ _id: id });
}

exports.getOneArticle = async data => {
  const { id } = data;
  const article = await Article
    .findOne({ _id: id })
    .populate('createdBy', '-password');
  if (!article) {
    return Promise.reject('게시물이 없습니다.')
  }
  return article;
}

exports.getArticles = async data => {
  const {
    limit = 10,
    page = 1,
    user,
  } = data;

  const articles = await Article.find({

  })
  .limit(limit)
  .skip((page - 1) * limit)

  return articles;
}