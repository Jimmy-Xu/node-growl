Growl for nodejs
============================

Growl support for Nodejs. Notify Growl via gntp-send command line.

# Dependency

- gntp-send


# Installation

## Install Growl desktop

- [Growl for Windows](http://www.growlforwindows.com/gfw)
- [Growl for Linux](https://github.com/mattn/growl-for-linux)
- [Growl for MacOSX](http://growl.info)

## Install gntp-send

```
//compile gntp-send from source
git clone https://github.com/mattn/gntp-send.git
cd gntp-send
./autogen.sh
./configure
make
make install

//show usage
gntp-send: [-u] [-i] [-a APPNAME] [-n NOTIFY] [-s SERVER:PORT] [-p PASSWORD] title message [icon] [url]
  -u tcpsend
  -i read_stdin
  -a appname
  -n notify
  -s server
  -p password
  
//example
gntp-send -a test -s 192.168.1.23:23053 -p xxx "title" "message" "" "https://www.google.com"
```

# For development

```
//install dependency
$ sudo npm install eslint eslint-plugin-import eslint-plugin-node eslint-config-airbnb-base -g

$ npm run lint
$ npm test
```

# Example

```
//install module
npm install node-growl

//usage
var nodeGrowl = require('node-growl')
nodeGrowl("title", "message", {server:"192.168.1.23:23053", password:"xxxx", appname:"test", url:"https://www.google.com"})

//more example
see test.js
```