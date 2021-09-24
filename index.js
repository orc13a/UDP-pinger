// Kilder ########################################

// 1 : https://nodejs.org/api/dgram.html
// 2 : https://gist.github.com/sid24rane/6e6698e93360f2694e310dd347a2e2eb
// 3 : https://github.com/sindresorhus/boxen#boxen

// ########################################

const udp = require('dgram'); // En del af Node.js, kilde 1
const boxen = require('boxen'); // Til at lave kasserne i terminalen, kilde 3

const PORT = 8888;
const HOST = 'localhost';

// Server ########################################

const server = udp.createSocket('udp4');

// Når serveren modtager en besked
server.on('message', (msg, info) => {
    const nr = msg.toString().split(' ')[1];
    
    // 'Received %d bytes from %s:%d', msg.length, info.address, info.port

    // console.log(boxen(
    //     'Data received from client: ' + msg.toString()
    // , { padding: 1, borderStyle: 'round', borderColor: 'green' }));

    console.log(`Server received: ${msg}`);

    server.send(`Pong ${nr}`, info.port, HOST, (error) => {
        if (error) {
            console.log(error);
            // client.close();
        } else {

        }
    });
});

// Serverens detaler 
server.on('listening', () => {
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

// Hvis serveren slukkes
server.on('close', () => {
    console.log('Socket is closed!');
});

// Start serven, bruger "listening" funktionen
server.bind(PORT);

// Client ########################################

const client = udp.createSocket('udp4');

// Client sender beskeder til serveren
for (let i = 1; i < 11; i++) {
    client.send(`Ping ${i}`, PORT, HOST, (error) => {
        if(error) {
            console.log(error);
            client.close();
        } else {
            // console.log(`Data sent, ${i}`);
        }
    });
}

client.on('message', (msg, info) => {
    console.log(`Client received: ${msg.toString()}`);
});

// ########################################