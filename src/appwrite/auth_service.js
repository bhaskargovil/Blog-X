import { Client, Account, ID } from "appwrite";
import config from "../configureEnvVars/config";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) return this.login({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get("current");
    } catch (error) {
      return false;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error.message);
    }
  }
}

const authService = new AuthService();
export default authService;
