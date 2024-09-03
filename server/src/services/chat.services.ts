import HubService from "@websockets/hub.service";

class ChatService {
  private readonly MAX_MESSAGES: number = 9;
  private readonly messages: string[] = [];

  constructor(private hub: HubService) {
  }

  getChat(): string[] {
    return this.messages;
  }

  setChat(message: string): void {
    if (this.messages.length === this.MAX_MESSAGES) {
      this.hub.notifyMessageRemoved(this.messages.shift());
    }
    this.messages.push(message);
    this.hub.notifyMessageAdded(message);
  }
}

export default ChatService;
