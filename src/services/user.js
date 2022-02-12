import { BaseService } from "@/services/base.js";

export class UserService extends BaseService {
  constructor() {
    super("user");
  }

  login(params) {
    return this.client.post(`${this.namespace}/login`, params);
  }

  register(params) {
    return this.client.post(`${this.namespace}/register`, params);
  }

  join_league(params) {
    return this.client.post(`${this.namespace}/join_league`, params);
  }

  get_leagues_for_user() {
    return this.client.get(`${this.namespace}/leagues`);
  }

  get_picture() {
    return this.client.get(`${this.namespace}/picture`);
  }
}
