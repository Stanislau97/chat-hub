import express from 'express';
import { PORT, CORS_ORIGIN, CORS_METHODS } from '@config';
import cors from 'cors';
import { errorMiddleware } from '@middlewares/error.middleware';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes) {
    this.app = express();
    this.port = PORT;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private logServerStart() {
    console.info(`╭───────────────────────────────────────────────────╮`);
    console.info(`│                                                   │`);
    console.info(`│            App listening at port ${this.port}!            │`);
    console.info(`│                                                   │`);
    console.info(`╰───────────────────────────────────────────────────╯`);
  }

  listen(): void {
    this.app.listen(this.port, () => this.logServerStart());
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

  private initializeRoutes(routes): void {
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }
}

export default App;
