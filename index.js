// Kilder ########################################

// 1 : https://nodejs.org/api/dgram.html
// 2 : https://gist.github.com/sid24rane/6e6698e93360f2694e310dd347a2e2eb

// ########################################

const udp = require('dgram');
const boxen = require('boxen');

const PORT = 8888;
const HOST = 'localhost';

// Server ########################################

const server = udp.createSocket('udp4');

server.on('message', function(msg, info){
    // 'Received %d bytes from %s:%d', msg.length, info.address, info.port

    console.log(boxen(
        'Data received from client: ' + msg.toString()
    , { padding: 1, borderStyle: 'round', borderColor: 'green' }));
});

server.on('listening', function(){
    let address = server.address();
    let port = address.port;
    let family = address.family;
    let ipaddr = address.address;

    console.log(boxen(
        'Server is listening at port: ' + port + '\n' +
        'Server ip: ' + ipaddr + '\n' + 
        'Server is IP4/IP6: ' + family
    , { padding: 1, borderStyle: 'round', borderColor: 'yellow' }));
});

server.on('close', function(){
    console.log('Socket is closed !');
});

server.bind(PORT);

// Client ########################################

const client = udp.createSocket('udp4');

client.send('hej', PORT, HOST, function(error){
    if(error){
        client.close();
    } else {
        console.log('Data sent!');
    }
});

// ########################################