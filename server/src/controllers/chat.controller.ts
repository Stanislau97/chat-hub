import ChatService from '@services/chat.services';
import HubService from '@websockets/hub.service';
import { Request, Response, NextFunction } from 'express';

class ChatController {
  private chatService: ChatService;

  constructor(hub: HubService) {
    this.chatService = new ChatService(hub);
  }

  getMessages = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const messages = this.chatService.getMessages();
      res.status(200).send(messages);
    } catch (error) {
      next(error);
    }
  };

  sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const message = this.chatService.sendMessage(req.body);
      res.status(200).send(message);
    } catch (error) {
      next(error);
    }
  };
}

export default ChatController;
