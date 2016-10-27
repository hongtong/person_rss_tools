var nodemailer = require('nodemailer');

var Mail = function (content,reciver) {
    this.content = content;
    this.reciver = reciver;
}
Mail.prototype = {
    send:function() {
        var transporter =  nodemailer.createTransport('smtps://848681620%40qq.com:jdimbafcypaqbdai@smtp.qq.com');


        var mailOptions = {
            from: 'Fred Guo <848681620@qq.com>', // sender address
            to: this.reciver, // list of receivers
            subject: 'My Read', // Subject line
            text: 'My Read', // plaintext body
            html: this.content // html body
        };

        transporter.sendMail(mailOptions, function(error, info){
            console.log(info)
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });
        //process.exit();
    }
}
module.exports = Mail;