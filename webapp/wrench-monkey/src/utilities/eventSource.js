import config from '../config';

const eventSourceManager = (setStatus, setTools, setHistory) => {
    const eventSource = new EventSource(`${config.apiURL}/stream`);

    eventSource.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === 'status') {
            //console.log('Received status:', parsedData.data);
            setStatus(parsedData.data);
        } else if (parsedData.type === 'tools') {
            //console.log('Received tools:', parsedData.data);
            setTools(parsedData.data);
        } else if (parsedData.type === 'history') {
            //console.log('Received history:', parsedData.data);
            setHistory(parsedData.data);
        }
    };

    eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
    };

    return () => {
        eventSource.close();
    };
};

export { eventSourceManager };
