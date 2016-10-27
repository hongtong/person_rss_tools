var http = require('http');
var get_data_method = require('./get_data_method');


var get_data =  function(item) {
    return new Promise(function(resolve,reject) {
                    http.get(item.url,function(res) {
                        var content = '';
                        res.on('data',function(dt) {
                            content += dt;
                        });
                        res.on('end',function() {
                            resolve({name:item.name,content:get_data_method[item.type](content)});
                        })
                    }).on('error', function(e) {

                        reject("Got error: " + e.message)
                    });

                });
}


module.exports=get_data;