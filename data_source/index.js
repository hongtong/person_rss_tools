var fs = require('fs');
var get_data = require('./get_data');
var Mail = require('./send_mail');
var creat_mail = require('./creat_mail_content');

fs.readFile('../rss_list.json','utf8', function (err, data) {
    if (err) throw err;
    var rss_list = JSON.parse(data)['list'];
    var send_content = [];
    var rsslength = rss_list.length;


    Object.defineProperty(global,"rss_length",{
        get : function() {
            return rsslength;
        },
        set : function(newValue){
            rsslength = newValue;
            if(newValue == 0) {

                var send_str = creat_mail(send_content);

                var rss_mail = new Mail(send_str, 'ghongtong@foxmail.com');
                rss_mail.send();
            }
        },
    });


    Promise.all(
        rss_list.map(function(i) {
            return get_data(i);
        })
    ).then(function(c)  {

        var send_str = creat_mail(c);
        var rss_mail = new Mail(send_str, 'ghongtong@foxmail.com');
        rss_mail.send();
    });

});