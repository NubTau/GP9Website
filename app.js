const express = require('express')
const path = require("path")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const ejs = require("ejs")
const { networkInterfaces } = require('os')

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    console.log("new visitor")
    next()
})

app.get("/",(req,res)=>{
    res.sendFile("./index.html",{root:__dirname})
})

app.get("/about",(req,res)=>{
    res.sendFile("./about.html",{root:__dirname})
})


// Interact with mongodb

app.use(bodyParser.urlencoded({extended:true}));

const url = "mongodb+srv://cmuser:cmuser@cluster0.lms4k.mongodb.net/GPS";

mongoose.connect("mongodb+srv://cmuser:cmuser@cluster0.lms4k.mongodb.net/GPS",{useNewUrlParser: true},{useUnifiedTopology: true});

//Create data schema
  const schema = {
    district : String
}

const Note = mongoose.model("District",schema);

app.set("view engine","ejs")

app.post("/", function(req,res) {
    let newNode = new Note({
        district: req.body.district

    });
    newNode.save();
    res.redirect("/");   
})

app.listen(3000)