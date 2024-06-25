let clients = [];

const addClient = (res) => {
    clients.push(res);
    console.log(`Client added. Total clients: ${clients.length}`);
};

const removeClient = (res) => {
    clients = clients.filter(client => client !== res);
    console.log(`Client removed. Total clients: ${clients.length}`);
};

const broadcastEvent = (data, type) => {
    const payload = JSON.stringify({ type, data });
    console.log(`Broadcasting ${type}:`, payload);
    clients.forEach(client => client.write(`data: ${payload}\n\n`));
};

module.exports = {
    addClient,
    removeClient,
    broadcastEvent,
    getClients: () => clients
};
