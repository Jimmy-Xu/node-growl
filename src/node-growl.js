'use strict';

/**
 * Module dependencies.
 */

const spawn = require('child_process').spawn;
const fs = require('fs');
const path = require('path');

const exists = fs.existsSync || path.existsSync;
const cmdline = 'gntp-send'
let cmd;

function which(name) {
    const paths = process.env.PATH.split(':');
    let loc;

    for (let i = 0, len = paths.length; i < len; i += 1) {
        loc = path.join(paths[i], name);
        if (exists(loc)) return loc;
    }
    return false;
}

function setupCmd(server, password) {
    if (which(cmdline)) {
        cmd = {
            pkg: cmdline,
            server: {
                flag: '-s',
                value: server,
            },
            password: {
                flag: '-p',
                value: password,
            }
        };
    }
}

/**
 * @param title     : required
 * @param msg       : can be empty
 * @param opts      : { server:"<ip:port>", password:"<password>", appname:"<apname>", url:"<url>" }
 * @param callback  : callback function
 */
function nodeGrowl(title, msg, opts, callback) {
    const options = opts || {};
    const fn = callback || function noop() {};

    setupCmd(opts.server, opts.password);
    if (!cmd) {
        console.error('gntp-send is missing, please install it first')
        fn(new Error('gntp-send is missing, please install it first'));
        return;
    }
    const args = [cmd.pkg];

    if (cmd.server) args.push(cmd.server.flag, cmd.server.value);
    if (cmd.password) args.push(cmd.password.flag, cmd.password.value);
    if (options.appname) args.push('-a', options.appname);

    if (title) {args.push(title)} else { args.push('<untitled>') }
    args.push(msg.replace(/\\n/g, '\n'));

    if (options.icon) {args.push(options.icon)} else { args.push('') }
    if (options.url) args.push(options.url)

    const cmdToExec = args.shift();
    console.debug(cmdToExec, args)
    const child = spawn(cmdToExec, args);
    let stdout = '';
    let stderr = '';
    let error;

    child.on('error', (err) => {
        console.error('An error occured.', err);
        error = err;
    });

    child.stdout.on('data', (data) => {
        stdout += data;
    });

    child.stderr.on('data', (data) => {
        stderr += data;
    });

    child.on('close', (code) => {
        error = error || code === 0 ? null : code;
        if (typeof fn === 'function') {
            fn(error, stdout, stderr);
        }
    });
}

/**
 * Expose `nodeGrowl`.
 */

module.exports = nodeGrowl;
