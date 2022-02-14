{
  // 의미 있는 곳에서 에러 처리하는 것이 중요

  class NetWorkClient {
    tryConnect(): void {
      throw new Error('no network!');
    }
  }

  class UserService {
    constructor(private client: NetWorkClient) {}
    login() {
      this.client.tryConnect();
    }
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      try {
        this.userService.login();
      } catch (error) {
        // show dialog to user...
      }
    }
  }

  const client = new NetWorkClient();
  const userService = new UserService(client);
  const app = new App(userService);
  app.run();
}
