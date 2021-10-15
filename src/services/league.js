import { BaseService } from "@/services/base.js";

export class LeagueService extends BaseService {
  constructor() {
    super("league");
  }

  create(params) {
    return this.client.post(`${this.namespace}`, params);
  }

  read(id = "", params = {}) {
    return this.client.get(`${this.namespace}/${id}`, { params: params });
  }

  get_ranking_history(id) {
    return this.client.get(`${this.namespace}/${id}/ranking_history`);
  }
}
