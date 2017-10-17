var nodeGrowl = require('./src/node-growl')

var server = '192.168.1.23:23053'
var password = 'aaa123aa'

var title = ""
var msg = ""
var opts = {
    server: server,
    password: password,
    appname: '',
    url: '',
}
var callback

function fn(data){
    console.log("callback:",data)
}

switch (process.argv[2]) {
    case '1':
        title = 'this is a title'
        msg = 'title demo'
        break;
    case '2':
        opts.appname = 'test'
        msg = 'appname demo'
        break;
    case '3':
        opts.url = 'https://www.baidu.com'
        title = 'url demo'
        msg = 'please click here'
        break;
    case '4':
        callback = fn
        title = 'callback demo'
        break;
    default:
        msg = 'basic demo'
}

console.debug(msg,opts,callback)
if (callback) {
    nodeGrowl(title, msg, opts, callback)
} else {
    nodeGrowl(title, msg, opts)
}
