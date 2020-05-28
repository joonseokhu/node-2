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
    return Promise.reject([404, '게시물이 없습니다.'])
  }
  if (prev.createdBy !== user.id) {
    return Promise.reject([403, '본인이 아닙니다.'])
  };
  return Article.findOneAndUpdate(
    { _id: id },
    {
      title,
      content,
    },
    {
      returnNewDocument: true,
    },
  );
}

exports.deleteArticle = async data => {
  const { id, user } = data;
  const prev = await Article.findOne({ _id: id });
  if (!prev) {
    return Promise.reject([404, '게시물이 없습니다.'])
  }
  if (prev.createdBy !== user.id) {
    return Promise.reject([403, '본인이 아닙니다.'])
  };
  return Article.deleteOne({ _id: id });
}

exports.getOneArticle = async data => {
  const { id } = data;
  const article = await Article
    .findOne({ _id: id })
    .populate('createdBy', '-password');
  if (!article) {
    return Promise.reject([404, '게시물이 없습니다.'])
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
  .populate('createdBy', '-password')

  const count = await Article.countDocuments({

  });

  return [ articles, count ];
}

exports.addLike = async data => {
  const { id, user } = data;
  
  const article = await Article.findOne({ _id: id });
  
  const hasLiked = article.likes.filter(like => {
    return like.toString() === user.id
  });
  if (hasLiked.length) {
    return Promise.reject([403, '이미 좋아요 했습니다']);
  }
  // 글을 가져오고 그 글의 좋아요 목록에 내 아이디가 있는지 찾아서 있으면 에러
  return Article.findOneAndUpdate(
    { _id: id },
    {
      // likes: article.likes.concat(user.id),
      $push: {
        likes: user.id
      },
    },
    {
      new: true,
    },
  )
}

exports.removeLike = async data => {
  const { id, user } = data;
  
  const article = await Article.findOne({ _id: id });
  
  const hasLiked = article.likes.filter(like => {
    return like.toString() === user.id
  });

  if (!hasLiked.length) {
    return Promise.reject([403, '취소할 좋아요가 없습니다.']);
  }

  // 글을 가져오고 그 글의 좋아요 목록에 내 아이디가 있는지 찾아서 있으면 에러
  return Article.findOneAndUpdate(
    { _id: id },
    {
      // likes: article.likes.filter(like => like.toString() !== user.id),
      $pull: {
        likes: user.id,
      },
    },
    {
      new: true,
    }
  );
}