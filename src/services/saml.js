import { BaseService } from "@/services/base.js";

export class SamlService extends BaseService {
  constructor() {
    super("saml");
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
