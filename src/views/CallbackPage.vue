<template></template>

<script>
import { UserService } from "@/services/user";

export default {
  data() {
    return {};
  },
  async created() {
    let userService = new UserService();

    let response = await userService.callback(this.$route.query);

    this.$store.dispatch("user/StoreAccessTokenData", {
      accessToken: response.access_token,
    });

    this.$router.push({ name: "home" });
  },
};
</script>

<style lang="css" scoped></style>
