import { store } from "@/store";

import {
  SET_IS_GLOBAL_LOADING,
  SET_IS_GLOBAL_ERROR,
  SET_GLOBAL_ERROR_MESSAGE,
} from "@/store/mutation-types.js";

describe("@/store/index.js", () => {
  it("Tests the root module of the store (mutations).", async () => {
    store.commit(SET_IS_GLOBAL_LOADING, true);
    expect(store.getters["isGlobalLoading"]).toBe(true);

    store.commit(SET_IS_GLOBAL_ERROR, true);
    expect(store.getters["isGlobalError"]).toBe(true);

    store.commit(SET_GLOBAL_ERROR_MESSAGE, "Error message");
    expect(store.getters["globalErrorMessage"]).toBe("Error message");
  });

  it("Tests the root module of the store (actions).", async () => {
    store.dispatch("setIsGlobalLoading", true);
    expect(store.getters["isGlobalLoading"]).toBe(true);

    store.dispatch("setIsGlobalError", true);
    expect(store.getters["isGlobalError"]).toBe(true);

    store.dispatch("setGlobalErrorMessage", "Error message");
    expect(store.getters["globalErrorMessage"]).toBe("Error message");
  });
});
