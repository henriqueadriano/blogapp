const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const db = "mongodb://bloguser:senha1234@ds133776.mlab.com:33776/blogapp_01";

mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.log(`Error connectiong: ${err}`)
    }
})