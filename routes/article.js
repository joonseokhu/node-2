const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle)
router.get('/', articleController.getArticles)

module.exports = router;