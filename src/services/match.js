import { BaseService } from "@/services/base.js";

export class MatchService extends BaseService {
  constructor() {
    super("match");
  }

  create(params) {
    return this.client.post(`${this.namespace}`, params);
  }
}
