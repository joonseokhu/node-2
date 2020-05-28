const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle)
router.get('/', articleController.getArticles)

router.post('/:id/like', articleController.addLike);
router.delete('/:id/like', articleController.removeLike);

module.exports = router;