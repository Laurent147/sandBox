//mailer for office365
require('dotenv').config();

const nodemailer = require('nodemailer'),
      {google}   = require('googleapis'),
      oAuth2     = google.auth.OAuth2;

const oAuth2Client = new oAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

oAuth2Client.setCredentials({
  refresh_token:process.env.REFRESH_TOKEN
});

const accessToken = oAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: process.env.USER2, //your gmail account you used to set the project up in google cloud console"
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken
     }});


var mailOptions2 = {
  from: 'overspam147@gmail.com',
  to: 'laurent.burte@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


transporter.sendMail(mailOptions2, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
