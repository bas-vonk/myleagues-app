import { mount } from "@vue/test-utils";
import moxios from "moxios";

import { Helpers } from "./helpers.js";
import { router } from "@/router";
import { i18n } from "@/locale";

import { leaguesResponse } from "./data/responses/get_user_leagues.js";

import { Api } from "@/api";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { store } from "@/store";
import App from "@/App.vue";

describe("HomePage", () => {
  let wrapper;
  let helpers;
  let mountOptions;
  let accessToken;

  beforeEach(async () => {
    // Suppresses [Vue Router warn]: Unexpected error when starting the router:
    // TypeError: Cannot read property '_history' of null
    router.push("/");
    await router.isReady();

    mountOptions = {
      attachTo: document.body,
      global: {
        // Add router to the plugins to resolve
        // [Vue warn]: Failed to resolve component: router-link
        // [Vue warn]: Failed to resolve component: router-view
        plugins: [router, store, i18n],
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $t: () => "mocked text",
        },
      },
    };

    helpers = new Helpers();
    accessToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJteWxlYWd1ZXMtYXBpIiwiZXhwIjoxNjM2Mzc4MjU0LjQ0Nzc3MDQsInVzZXJfaWQiOiI2OTdiMzhkYi0yZTU0LTQwZTMtYTRmYi04MjYxN2M3YTNhMWIiLCJ1c2VybmFtZSI6InJvb3QiLCJlbWFpbCI6InJvb3RAcm9vdCJ9.LQl2NZGS9nKOU53qVbH6CIFgECdQ9QD9l4_utKxfQTMzatUI47GI5o_8e1syulu6IC7PvbmgYdehMSFbWU-SWVcw8-iUZCz60uwQ0bj3spWvWReN2Bu3soZo4ww-TTfytm3kg6WeDvhtcMld27-VLCs4uvQu9LP8BvRLxC7javHcZqpFA9thumdDx42jfmrHuub3I7-aXV9o18cjMI-kZ4lQaPjmT1OjdUS1lNjnquCl2J4lwkJcCbE02Cgnj3R33naS6VOZhAu1AfItlRZ7cD816bI5uIBYq-H901hGODCH2lumJXAzSYLjfvZCDHUF1dNh8NUyVHcHnn01IxQf3g";

    moxios.install(Api);
    wrapper = mount(App, mountOptions);
  });
  afterEach(() => {
    moxios.uninstall();
    wrapper.unmount();
  });

  it("Shall update the size of the app when the window is resized.", () => {
    // Change the viewport to 500px.
    let innerHeight = 500;
    let expectedVh = `${innerHeight / 100}px`;

    // Set the height
    global.innerHeight = innerHeight;

    // Trigger the window resize event.
    global.dispatchEvent(new Event("resize"));

    expect(global.document.documentElement.style.getPropertyValue("--vh")).toBe(
      expectedVh
    );
  });

  it("Shall grab the JWT token from the Cookies and store it's contents in the app.", () => {
    // Add the accessToken to the mocked store

    store.commit("user/setAccessToken", accessToken, { root: true });

    wrapper = mount(App, mountOptions);

    expect(store.getters["user/username"]).toBe("root");
    expect(store.getters["user/emailAddress"]).toBe("root@root");
  });

  it("Shall load the leagues for a user when the user is already logged in.", async () => {
    // Mock the API call
    moxios.stubRequest(`user/leagues`, {
      status: 200,
      response: leaguesResponse,
    });

    store.commit("user/setAccessToken", accessToken, { root: true });

    wrapper = mount(App, mountOptions);

    await helpers.awaitMoxios();

    // Assert leagues are added to the application state
    let leagues = store.getters["user_leagues/leagues"];
    expect(leagues).toStrictEqual(
      leaguesResponse.data.map((league) => league.attributes)
    );
  });

  it("Shall load a generic error message when no error message is provided.", async () => {
    // Mock the API call
    moxios.stubRequest(`user/leagues`, {
      status: 500,
      response: "Weird error, probably caused because the API was unreachable.",
    });

    store.commit("user/setAccessToken", accessToken, { root: true });

    wrapper = mount(App, mountOptions);

    await helpers.awaitMoxios();

    // Assert the global error message
    let errorMessage = "Something went wrong. Try again later.";
    expect(store.getters["isGlobalError"]).toBe(true);
    expect(store.getters["globalErrorMessage"]).toBe(errorMessage);

    // Assert the global error message to be gone
    // Emit from the child
    wrapper.findComponent(ErrorMessage).vm.$emit("close");
    expect(store.getters["isGlobalError"]).toBe(false);
    expect(store.getters["globalErrorMessage"]).toBe("");
  });
});
