import { BaseService } from "@/services/base.js";

export class UserService extends BaseService {
  constructor() {
    super("user");
  }

  login(params) {
    return this.client.post(`${this.namespace}/login`, params);
  }

  login_google() {
    return this.client.get(`${this.namespace}/login_google`);
  }

  callback(params) {
    return this.client.get(`${this.namespace}/callback`, { params });
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
}
