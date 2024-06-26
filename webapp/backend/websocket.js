// websocket.js
const WebSocket = require('ws');
const axios = require('axios');
const { broadcastEvent } = require('./sse');
const config = require('./config');

let wsServer;

const setupWebSocketServer = (server) => {
    wsServer = new WebSocket.Server({ server });

    wsServer.on('connection', (ws) => {
        console.log('Robot connected via WebSocket');

        // Update connection status to true
        axios.post(`${config.apiURL}/status/updateConnection`, { isConnected: true })
            .then(() => console.log('Updated connection status to true'))
            .catch(err => console.error('Error updating connection status:', err));

        ws.on('message', (message) => {
            const decodedMessage = Buffer.from(message).toString('utf-8');
            console.log('Received message from robot:', decodedMessage);
        });

        ws.on('pong', () => {
            console.log('Received pong from robot');
            ws.isAlive = true;
        });

        ws.isAlive = true;
        ws.robot = true;
    });

    const pingInterval = setInterval(() => {
        wsServer.clients.forEach((ws) => {
            if (!ws.isAlive && ws.robot) {
                console.log('Robot connection lost');
                // Update connection status to false
                axios.post(`${config.apiURL}/status/updateConnection`, { isConnected: false })
                    .then(() => console.log('Updated connection status to false'))
                    .catch(err => console.error('Error updating connection status:', err));
                return ws.terminate();
            }

            ws.isAlive = false;
            ws.ping();
        });
    }, 10000);

    wsServer.on('close', () => {
        clearInterval(pingInterval);
    });
};

const sendCommandToRobot = (command) => {
    wsServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.robot) {
            client.send(JSON.stringify(command));
        }
    });
};

module.exports = { setupWebSocketServer, sendCommandToRobot };
