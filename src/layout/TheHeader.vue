<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MYLEAGUES</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span
          class="navbar-toggler-icon"
          @click.prevent="toggleNavbarCollapse()"
        ></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link text-white"
              role="button"
              data-bs-toggle="dropdown"
            >
              <span
                class="flag-icon"
                :class="`flag-icon-${iso3166CountryCodeFromActiveLocale}`"
              ></span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a class="dropdown-item" @click="setLocale('en')">
                  <span class="flag-icon flag-icon-gb"></span> English
                </a>
              </li>
              <li>
                <a class="dropdown-item" @click="setLocale('nl')">
                  <span class="flag-icon flag-icon-nl"></span> Nederlands
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              @click.prevent="toggleNavbarCollapse()"
              :to="{ name: 'home' }"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <a
              href="https://github.com/bas-vonk/myleagues-app/issues"
              class="nav-link text-white"
              target="_blank"
              >Feedback</a
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link text-white"
              role="button"
              data-bs-toggle="dropdown"
            >
              My Leagues
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li v-for="league in leagues" :key="league.id">
                <router-link
                  class="dropdown-item"
                  @click.prevent="toggleNavbarCollapse()"
                  :to="{ name: 'league', params: { id: league.id } }"
                  >{{ league.name }}</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link text-white"
              role="button"
              data-bs-toggle="dropdown"
            >
              {{ username }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li><a class="dropdown-item" @click="logout">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["leagues", "username"],
  emits: ["toggleNavbar"],
  data() {
    return {
      navbarIsCollapsed: true,
    };
  },
  methods: {
    setLocale(locale) {
      this.$root.$i18n.locale = locale;
      this.$store.dispatch("user/SetLocale", { locale: locale });
    },
    logout() {
      // Collapse the menu
      this.toggleNavbarCollapse();

      this.$store.dispatch("user/Logout");
      this.$router.push("login");
    },
    toggleNavbarCollapse() {
      this.navbarIsCollapsed = !this.navbarIsCollapsed;

      // Actually perform the collapse
      if (this.navbarIsCollapsed === true) {
        let navbar = document.getElementById("navbarNavDropdown");
        navbar.classList.remove("show");
      }
    },
  },
  computed: {
    iso3166CountryCodeFromActiveLocale() {
      let locale = this.$root.$i18n.locale;
      let fallBackCountryCode = "gb";

      let iso639to3166 = {
        nl: "nl",
        en: "gb",
      };

      let iso3166CountryCode = iso639to3166[locale];

      return iso3166CountryCode ? iso3166CountryCode : fallBackCountryCode;
    },
  },
  watch: {
    navbarIsCollapsed(newValue) {
      // If not on mobile mode, do nothing (collapse navbar doesn't exist)
      // TODO: Use some proper indicator to check for mobile mode (instead of >1000)
      if (window.innerWidth > 1000) {
        return;
      }

      let extraVhForMenu = 15;

      if (newValue === false) {
        document.documentElement.style.setProperty(
          "--extra-menu-vh",
          `${extraVhForMenu}vh`
        );
      } else {
        document.documentElement.style.setProperty("--extra-menu-vh", 0);
      }
    },
  },
};
</script>

<style>
.nav-item {
  margin-left: 1rem;
  margin-right: 1rem;
}
.navbar {
  background: rgba(35, 70, 130, 40%) !important;
  box-shadow: 0 0.025rem #000000 !important;
  min-height: calc(var(--vh, 1vh) * 7.5) !important;
}
</style>
