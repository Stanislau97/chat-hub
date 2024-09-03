import ChatController from '@controllers/chat.controller';
import { IRoute } from '@interfaces';
import HubService from '@websockets/hub.service';
import { Router } from 'express';

class ChatRoute implements IRoute {
  path = '/chat';
  router = Router();
  
  private chatController: ChatController;

  constructor(hub: HubService) {
    this.chatController = new ChatController(hub);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/`, this.chatController.getChat);
    this.router.post(`${this.path}/`, this.chatController.setChat);
  }
}

export default ChatRoute;
