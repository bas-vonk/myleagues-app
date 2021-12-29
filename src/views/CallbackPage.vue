<template><div></div></template>

<script>
import { SamlService } from "@/services/saml";

export default {
  data() {
    return {};
  },
  async created() {
    let samlService = new SamlService();

    let response = await samlService.callback(this.$route.query);

    this.$store.dispatch("user/StoreAccessTokenData", {
      accessToken: response.access_token,
    });

    this.$router.push({ name: "home" });
  },
};
</script>

<style lang="css" scoped></style>
