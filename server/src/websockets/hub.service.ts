import WebSocket from 'ws';

class HubService {
    constructor(
        private wss: WebSocket.Server
    ) { }

    setup(): void {
        this.wss.on('connection', (ws: WebSocket) => {
            console.log('New client connected');
            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
    }

    private task(message: string): void {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    notifyMessageAdded(message: string): void {
        this.task(JSON.stringify({ type: 'add', message }));
    }

    notifyMessageRemoved(message: string): void {
        this.task(JSON.stringify({ type: 'remove', message }));
    }
}

export default HubService;
