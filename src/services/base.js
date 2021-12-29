import { Api } from "@/api";

export class BaseService {
  constructor(namespace) {
    this.namespace = namespace;
    this.client = Api;
  }

  call_healthcheck() {
    return this.client.get("healthcheck");
  }
}
