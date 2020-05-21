const articleService = require('../services/article');

exports.createArticle = async (req, res, next) => {
  try {
    const article = await articleService.createArticle({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user,
    });
    res.json(article);
  } catch (err) {
    next(err)
  }
}
exports.updateArticle = async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
}
exports.deleteArticle = async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
}
exports.getOneArticle = async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
}
exports.getArticles = async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
}

