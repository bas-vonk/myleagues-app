<template><div></div></template>

<script>
import { OAuthService } from "@/services/oauth";
import { store } from "@/store";
import { router } from "@/router";

export default {
  data() {
    return {};
  },
  async beforeRouteEnter(to) {
    let oauthService = new OAuthService();

    // Start spinner
    store.dispatch("setIsGlobalLoading", true, { root: true });

    // Process the callback in the backend
    let response = await oauthService.callback(to.query);

    store.dispatch("user/StoreAccessTokenData", {
      accessToken: response.access_token,
    });

    // Get the leagues for a user
    await store.dispatch("user_leagues/GetLeaguesForUserAndAdd");

    router.push({ name: "home" });

    // Stop spinner
    store.dispatch("setIsGlobalLoading", false, { root: true });
  },
};
</script>

<style lang="css" scoped></style>
