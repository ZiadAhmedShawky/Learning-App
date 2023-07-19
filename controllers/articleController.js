const Article = require("../DBModels/Article");

exports.getAddArticle=async(req,res)=>{
  try{
    res.render('./article/addArticle')
  }catch(e){

  }
}

exports.addArticle=async(req,res)=>{
  const article=await Article.create({
    name:req.body.name,
    article:req.body.article
  })
  try{
    await article.save()
    
    res.redirect('/article')
  }catch(e){
    res.json(e)
  }
}

exports.getArticles=async(req,res)=>{
  try {
    const articles=await Article.find()
    res.render('./article/article',{
      articles
    })
  } catch (e) {
    res.json({
      message:e.message
    })
  }
}
exports.getArticle = async (req, res) => { 
  try {
    const { name } = req.params;
    const article =await Article.find({name});
    res.render('./article/article-content',{
      article
    })
  } catch (e) {
    res.json({
      message:e.message
    })
  }
};
