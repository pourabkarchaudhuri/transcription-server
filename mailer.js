'use strict';


const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//            user: 'htlp002@gmail.com',
//            pass: 'Hexaware321'
//        }
//    });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
                   user: 'htlp002@gmail.com',
                   pass: 'Hexaware321'
          }
});
const sender = '"NoReply_InnovationLab" <htlp002@gmail.com>';


module.exports = {
    'Mailer': function(to, title, file, path, callback){
        console.log('Sending Mail');
        let mailOptions = {
            from: sender, // sender address
            to: to, // list of receivers
            subject: title, // Subject line
            html: '<p>&nbsp;</p><p>Hi</p><p>PFA a copy of your transcript from your awesome session.</p><p>Keep disrupting with all your awesome sessions and solutions.</p><p>Have a nice day. &nbsp;</p><p>&nbsp;</p><p>Thanks</p><p>Innovation Lab</p>',
            attachments:[
                {
                    filename: file,
                    path: path
                }
            ]
        
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                callback(error, null);
                
            }
            else{
                callback(null, 'Mail successfully sent');
            }
            
        });
    }
}