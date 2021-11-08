import { mount } from "@vue/test-utils";

import { router } from "@/router";
import { store } from "@/store";
import { i18n } from "@/locale";
import { leaguesResponse } from "./../../data/responses/get_user_leagues.js";

import TheHeader from "@/components/ui/TheHeader.vue";

async function getAnchorElementByText(wrapper, text) {
  let links = await wrapper.findAll("a");
  return links.find((link) => link.text() === text);
}

describe("The Header", () => {
  let wrapper;
  let username;
  let overlayDiv;

  beforeEach(() => {
    username = "bas";

    // Mock the overlay
    overlayDiv = document.createElement("div");
    overlayDiv.id = "overlay";
    overlayDiv.style.display = "none";
    document.body.appendChild(overlayDiv);

    wrapper = mount(TheHeader, {
      attachTo: document.body,
      props: {
        username: username,
        leagues: leaguesResponse.data.map((league) => league.attributes),
      },
      global: {
        // Add router to the plugins to resolve
        // [Vue warn]: Failed to resolve component: router-link
        plugins: [router, store, i18n],
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });
  });

  it("Shall offer functionality to change the locale.", async () => {
    // Suppresses [Vue Router warn]: Unexpected error when starting the router:
    // TypeError: Cannot read property '_history' of null
    router.push("/");
    await router.isReady();

    let logoutButton = await getAnchorElementByText(wrapper, "English");
    await logoutButton.trigger("click");

    expect(wrapper.vm.$i18n.locale).toBe("en");
    expect(store.getters["user/locale"]).toBe("en");
  });

  it("Shall offer logout functionality.", async () => {
    // Suppresses [Vue Router warn]: Unexpected error when starting the router:
    // TypeError: Cannot read property '_history' of null
    router.push("/");
    await router.isReady();

    let logoutButton = await getAnchorElementByText(wrapper, "Logout");
    await logoutButton.trigger("click");

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("login");
  });

  it("Shall lock the app when the hamburger menu is toggled open.", async () => {
    var navbarNavDropdown = document.querySelector("#navbarNavDropdown");
    var overlay = document.querySelector("#overlay");

    // When the screen is wide enough there is no hamburger menu, so do nothing
    let result = wrapper.vm.toggleNavbarCollapse(1000);
    expect(result).toBe(undefined);

    // Start in closed position and toggle the collapse
    wrapper.vm.toggleNavbarCollapse(800);
    expect(document.body.classList).toContain("fixed-position");
    expect(overlay.style.display).toBe("block");
    expect(navbarNavDropdown.classList).toContain("show");

    // Close the menu again and assert all relevant classes are removed or changed
    wrapper.vm.toggleNavbarCollapse(800);
    expect(document.body.classList).not.toContain("fixed-position");
    expect(overlay.style.display).toBe("none");
    expect(navbarNavDropdown.classList).not.toContain("show");
  });
});
