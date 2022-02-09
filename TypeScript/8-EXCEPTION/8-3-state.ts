{
  // Error State

  type SuccessState = {
    result: 'success';
  };

  type NetworkErrorState = {
    result: 'fail';
    reason: 'offline' | 'serverdown' | 'timeout';
  };

  type ResultState = SuccessState | NetworkErrorState;

  class NetWorkClient {
    tryConnect(): ResultState {}
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
