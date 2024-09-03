class ChatService {
  private messages: string[] = ['LOL'];

  getChat(): string[] {
    return this.messages;
  }

  setChat(message: string): string {
    this.messages.push(message);
    return message;
  }
}

export default ChatService;
