let clients = [];

const addClient = (res) => {
    clients.push(res);
};

const removeClient = (res) => {
    clients = clients.filter(client => client !== res);
};

const broadcastStatus = (status) => {
    const data = JSON.stringify(status);
    console.log('Broadcasting status:', data);
    clients.forEach(client => client.write(`data: ${data}\n\n`));
};

module.exports = {
    addClient,
    removeClient,
    broadcastStatus,
    getClients: () => clients
};
