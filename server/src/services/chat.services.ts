import { INotification } from "@models";
import HubService from "@websockets/hub.service";

class ChatService {
  private readonly MAX_MESSAGES: number = 9;
  private readonly messages: INotification[] = [];

  constructor(private hub: HubService) {
  }

  getMessages(): INotification[] {
    return this.messages;
  }

  sendMessage({ message }): INotification {
    if (this.messages.length === this.MAX_MESSAGES) {
      this.hub.notifyMessageRemoved(this.messages.shift());
    }
    const notification = { message, id: Date.now() };
    this.messages.push(notification);
    this.hub.notifyMessageAdded(notification);

    return notification;
  }
}

export default ChatService;
