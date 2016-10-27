/**
 * Created by guohongtong on 16/9/18.
 */
module.exports = function(rss_arr) {
    var mail_content='';
    for (var i in rss_arr) {
        cur_data = rss_arr[i].content;
        mail_content += 'blog:'+cur_data.blog_title
                      + '\n<br> '+cur_data.author_name;
        for(var j=0;j<cur_data.entry_list.length;j++ ) {
            mail_content += '\n<br>entry:'+cur_data.entry_list[j].title+' '+cur_data.entry_list[j].link+' '+cur_data.entry_list[j].published;
        }
        mail_content += '\n<br><br><br><br>';
    }
    return mail_content;
}