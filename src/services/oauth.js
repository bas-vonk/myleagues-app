import { BaseService } from "@/services/base.js";

export class OAuthService extends BaseService {
  constructor() {
    super("oauth");
  }

  get_request_uri(provider_name) {
    return this.client.get(
      `${this.namespace}/get_request_uri/${provider_name}`
    );
  }

  callback(params) {
    return this.client.get(`${this.namespace}/callback`, { params });
  }
}
