<template>
  <nav class="navbar navbar-expand-lg navbar-dark" id="mainNavbar">
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
                  <span class="flag-icon flag-icon-gb"></span>English</a
                >
              </li>
              <li>
                <a class="dropdown-item" @click="setLocale('nl')">
                  <span class="flag-icon flag-icon-nl"></span>Nederlands</a
                >
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
              >My Leagues</a
            >
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
              <img v-if="picture" :src="picture" />
              <span v-else>{{ username }}</span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a class="dropdown-item" @click="logout">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["leagues", "username", "picture"],
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
    toggleNavbarCollapse(width = window.screen.width) {
      // TODO: Find better indicator for mobile view
      // Now the breakpoint for the menu to go into 'hamburger mode' is simply used
      if (width > 991) {
        return;
      }

      this.navbarIsCollapsed = !this.navbarIsCollapsed;

      let navbar = document.getElementById("navbarNavDropdown");
      let overlay = document.getElementById("overlay");
      let body = document.querySelector("body");

      // Actually perform the collapse
      // (if the menu is open, lock the position of the app)
      if (this.navbarIsCollapsed === true) {
        overlay.style.display = "none";
        navbar.classList.remove("show");
        body.classList.remove("fixed-position");
      } else {
        overlay.style.display = "block";
        navbar.classList.add("show");
        body.classList.add("fixed-position");
      }
    },
  },
  computed: {
    iso3166CountryCodeFromActiveLocale() {
      let locale = this.$root.$i18n.locale;

      let iso639to3166 = {
        nl: "nl",
        en: "gb",
      };

      return iso639to3166[locale];
    },
  },
};
</script>

<style>
img {
  height: 1.5rem !important;
  /* margin-top: -0.75rem !important; */
  /* margin-bottom: -0.75rem !important; */
}
.hover {
  position: fixed;
  z-index: 2000;
}
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
