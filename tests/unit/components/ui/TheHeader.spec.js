import { mount } from "@vue/test-utils";

import { router } from "@/router";
import { leaguesResponse } from "./../../data/responses/get_user_leagues.js";

import TheHeader from "@/components/ui/TheHeader.vue";

describe("The Header", () => {
  it("Shall offer logout functionality.", async () => {
    // After this line, router is ready
    // Suppresses [Vue Router warn]: Unexpected error when starting the router: TypeError: Cannot read property '_history' of null
    router.push("/");
    await router.isReady();

    var username = "bas";

    // Mock the overlay
    const overlayDiv = document.createElement("div");
    overlayDiv.id = "overlay";
    overlayDiv.style.display = "none";
    document.body.appendChild(overlayDiv);

    var wrapper = mount(TheHeader, {
      attachTo: document.body,
      props: {
        username: username,
        leagues: leaguesResponse.data.map((league) => league.attributes),
      },
      global: {
        plugins: [router],
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $store: {
            dispatch: jest.fn(),
          },
          $i18n: {
            locale: "nl",
          },
          $t: () => "mocked text",
        },
      },
    });

    let links = await wrapper.findAll("a");
    let logoutButton = links.find((link) => link.text() === "Logout");

    await logoutButton.trigger("click");

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("login");
  });
});
