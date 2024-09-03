import ChatController from '@controllers/chat.controller';
import { Router } from 'express';

class ChatRoute {
  public path = '/chat';

  public router = Router();
  public chatController = new ChatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/`, this.chatController.getChat);
    this.router.post(`${this.path}/`, this.chatController.setChat);
  }
}

export default ChatRoute;
