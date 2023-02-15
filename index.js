const cheerio = require("cheerio");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const express = require("express");
const app = express();
const axios = require("axios"); 
const urlParser = require('url')
// const {fileRead} = require('./data')
const mongoose = require('mongoose');
var validator = require("email-validator");
const fetch = require('node-fetch');
const ImageModel = require('./model/img');
const fileUpload = require("express-fileupload");


const nodemailer = require("nodemailer");

var connection_string = `mongodb://127.0.0.1:27017/email-tet`;

mongoose.connect(connection_string);



const connection = mongoose.connection;

//event listeners
connection.on('error', () => console.log("error connecting database"));

connection.once('open', async () => {
    console.log("Database connected");
    
});
//exporting connection
module.exports = connection;



let transporter = nodemailer.createTransport({
    service: "gmail",
   
    auth: {
      user: 'axit720@gmail.com', // generated ethereal user
      pass: 'uvtuklmjcyqllmvr', // generated ethereal password
    },
  });

  
const mailSend=async()=>{
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'axit720@gamil.com', // sender address
    to: "axit.patel@pedalsup.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<img src="https://silent-buttons-give-122-170-68-94.loca.lt/event"/>` // 
  });

   console.log("Message sent: %s", info.messageId);
}
mailSend()

app.use(
  fileUpload()
);
app.get('/',(req,res)=>{
  console.log('hello')
})
app.get('/event',async(req,res)=>{
    console.log("hit")
    const img  = await ImageModel.find()
    // console.log(img)
    res.send(img[0].Image)
  })

  // app.post( '/upload' ,(req, res) => {
  //   // console.log(req.body)
  //   console.log(req.files)
  //   ImageModel.create({ Image: req.files.image.data})
  //     .then((doc) => {
  //       res.json(doc).status(200);
  //     })
  //     .catch((err) => {
  //       res.json(err).status(400);
  //     });
  // });


  app.listen(8080,()=>{
    console.log("server started")
  })
