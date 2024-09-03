import ChatService from '@services/chat.services';
import { Request, Response, NextFunction } from 'express';

class ChatController {
  private chatService = new ChatService();

  getChat = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const messages = this.chatService.getChat();
      res.status(200).send(messages);
    } catch (error) {
      next(error);
    }
  };

  setChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const chat = this.chatService.setChat(req.body);
      res.status(200).send(chat);
    } catch (error) {
      next(error);
    }
  };
}

export default ChatController;
