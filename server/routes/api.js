const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const db = "mongodb://bloguser:senha1234@ds133776.mlab.com:33776/blogapp_01";
const article = require('../models/article')

mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.log(`Error connectiong: ${err}`)
    }
})

router.get('/all', function(req, res){
    article.find({})
    .exec(function(err, articles){
        if(!err){
            console.log(articles)
            res.json(articles)
        }else{
            console.log(`Error on list articles: ${err}`)
        }
    })    
})

router.get('/articles/:id', function(req, res){
    console.log('Requesting a specific article')
    article.findById(req.params.id)
    .exec(function(err, article){
        if(!err){
            res.json(article);
        }else{
            console.log(`Error on list articles: ${err}`)
        }
    })
})

module.exports = router