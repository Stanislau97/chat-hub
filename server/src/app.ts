import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import { PORT, CORS_ORIGIN, CORS_METHODS } from '@config';
import { errorMiddleware } from '@middlewares/error.middleware';
import HubService from '@websockets/hub.service';
import ChatRoute from '@routes/chat.route';

class App {
  private app: express.Application;
  private server: http.Server;
  private hub: HubService;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.initializeMiddlewares();
    this.initializeWebSocket();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private logServerStart() {
    console.info(`╭───────────────────────────────────────────────────╮`);
    console.info(`│                                                   │`);
    console.info(`│            App listening at port ${PORT}!            │`);
    console.info(`│                                                   │`);
    console.info(`╰───────────────────────────────────────────────────╯`);
  }

  listen(): void {
    this.server.listen(PORT, () => this.logServerStart());
  }

  getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    const corsOptions = {
      origin: CORS_ORIGIN?.split(','),
      methods: CORS_METHODS?.split(','),
      credentials: true,
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    [new ChatRoute(this.hub)].forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeWebSocket(): void {
    const wss = new WebSocket.Server({ server: this.server });
    this.hub = new HubService(wss);
    this.hub.setup();
  }
}

export default App;
