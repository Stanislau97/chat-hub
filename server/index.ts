import App from '@app';
import ChatRoute from '@routes/chat.route';

const app = new App([new ChatRoute()]);

app.listen();
