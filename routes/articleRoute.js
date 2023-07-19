const express = require("express");
const articleController = require("../controllers/articleController");
const authController = require("../controllers/authController");
const router = express.Router();

//router.get("/article", articleController.articlePage);
router.get('/article',articleController.getArticles)
router.get('/article/:name',articleController.getArticle)
router.get('/addArticle',articleController.getAddArticle)
router.post('/addArticle',articleController.addArticle)


module.exports = router;
