//Mailer for Gmail
require('dotenv').config();

const nodemailer = require('nodemailer'),
      {google}   = require('googleapis'),
      oAuth2     = google.auth.OAuth2;

const oAuth2Client = new oAuth2(
  process.env.GCLIENT_ID,
  process.env.GCLIENT_SECRET
);

oAuth2Client.setCredentials({
  refresh_token:process.env.GREFRESH_TOKEN
});

const accessToken = oAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 465,
     secure: true,
     auth: {
          type: "OAuth2",
          user: process.env.GUSER, //your gmail account you used to set the project up in google cloud console"
          clientId: process.env.GCLIENT_ID,
          clientSecret: process.env.GCLIENT_SECRET,
          refreshToken: process.env.GREFRESH_TOKEN,
          accessToken: accessToken
     }});


var mailOptions = {
  from: 'overspam147@gmail.com',
  to: 'laurent.burte@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

/*
var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
}

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  html: '<h1>Welcome</h1><p>That was easy!</p>'
}
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});
*/
