<template><div></div></template>

<script>
import { SamlService } from "@/services/saml";
import { store } from "@/store";
import { router } from "@/router";

export default {
  data() {
    return {};
  },
  async beforeRouteEnter(to) {
    let samlService = new SamlService();

    let response = await samlService.callback(to.query);

    store.dispatch("user/StoreAccessTokenData", {
      accessToken: response.access_token,
    });

    router.push({ name: "home" });
  },
};
</script>

<style lang="css" scoped></style>
