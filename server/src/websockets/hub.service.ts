import { INotification } from '@models';
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
        console.error(this.wss);
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    notifyMessageAdded(data: INotification): void {
        this.task(JSON.stringify({ type: 'add', data }));
    }

    notifyMessageRemoved(data: INotification): void {
        this.task(JSON.stringify({ type: 'remove', data }));
    }
}

export default HubService;
