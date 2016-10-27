/**
 * Created by guohongtong on 16/1/6.
 */
var DOMParser = require('xmldom').DOMParser;

var get_data_method =  {
    feed: function (data) {
        var doc = new DOMParser().parseFromString(data);
        var entry_list = doc.getElementsByTagName('entry');
        var cur_date = new Date(new Date()-24*60*60*1000*20);

        var return_data = {};
        return_data.entry_list = [];
        return_data.blog_title = doc.getElementsByTagName('title')[0].childNodes[0].nodeValue;
        return_data.author_name = doc.getElementsByTagName('author')[0].getElementsByTagName('name')[0].childNodes[0].nodeValue;
        return_data.author_link = doc.getElementsByTagName('author')[0].getElementsByTagName('uri')[0].childNodes[0].nodeValue;
        cur_date.setDate(cur_date.getDate()-1);

        for (var i = 0; i < entry_list.length; i++) {
           var pub_date = new Date(entry_list[i].getElementsByTagName('published')[0].childNodes[0].nodeValue);
            //console.log(cur_date);
           //if(pub_date > cur_date) {
               return_data.entry_list[i] = {};
               return_data.entry_list[i].title  = entry_list[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
               return_data.entry_list[i].link = entry_list[i].getElementsByTagName('link')[0].getAttribute('href');
               return_data.entry_list[i].summary = entry_list[i].getElementsByTagName('summary')[0].childNodes[0].nodeValue;
               return_data.entry_list[i].published = entry_list[i].getElementsByTagName('published')[0].childNodes[0].nodeValue;
           //}
        }

        return return_data;
    },
    rss:function(data) {
        var doc = new DOMParser().parseFromString(data);
        var entry_list = doc.getElementsByTagName('item');
        var cur_date = new Date(new Date()-24*60*60*1000*20);

        var return_data = {};
        return_data.entry_list = [];
        return_data.blog_title = doc.getElementsByTagName('title')[0].childNodes[0].nodeValue;
        return_data.author_name = '';
        return_data.author_link = '';
        cur_date.setDate(cur_date.getDate()-1);

        for (var i = 0; i < entry_list.length; i++) {
            var pub_date = new Date(entry_list[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue);
            //console.log(cur_date);
            //if(pub_date > cur_date) {
            return_data.entry_list[i] = {};
            return_data.entry_list[i].title  = entry_list[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
            return_data.entry_list[i].link = entry_list[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;
            return_data.entry_list[i].summary = entry_list[i].getElementsByTagName('description')[0].childNodes[0].nodeValue.replace(/(^<!\[CDATA\[)|(\]\])>/,'');
            return_data.entry_list[i].published = entry_list[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
            //}
        }

        return return_data;

    }
}

module.exports=get_data_method;