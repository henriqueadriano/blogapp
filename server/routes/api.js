const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const db = "mongodb://bloguser:senha1234@ds133776.mlab.com:33776/blogapp_01";
const article = require('../models/article')

mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
    if (err) {
        console.log(`Error connectiong: ${err}`)
    }
})

router.get('/all', function (req, res) {
    article.find({})
        .exec(function (err, articles) {
            if (!err) {
                console.log(articles)
                res.json(articles)
            } else {
                console.log(`Error on list articles: ${err}`)
            }
        })
})

router.get('/articles/:id', function (req, res) {
    console.log('Requesting a specific article')
    article.findById(req.params.id)
        .exec(function (err, article) {
            if (!err) {
                res.json(article);
            } else {
                console.log(`Error on list articles: ${err}`)
            }
        })
})

router.post('/create', function (req, res) {
    console.log(`Posting an article`)
    var newArticle = new article()
    newArticle.title = req.body.title
    newArticle.content = req.body.content
    newArticle.save(function (err, article) {
        if (!err) {
            res.json(article)
        } else {
            console.log(`Error inserting the article\nError: ${err}`)
        }
    })
})

router.post('/update/:id', function (req, res) {
    console.log('Update an Article')
    article.findById(req.params.id)
        .exec(function (err, article) {
            if (!err) {
                article.title = req.body.title
                article.content = req.body.content
                article.save()
                res.json(article)
            } else {
                console.log(`Error updating an Article\nError: ${err}`)
            }
        })
})

router.get('/delete/:id', function (req, res) {
    console.log('Deleting article')
    article.findByIdAndRemove(req.params.id)
        .exec(function (err, article) {
            if (!err) {
                res.json(article);
            } else {
                console.log(`Error deleting article: ${err}`)
            }
        })
})

module.exports = router