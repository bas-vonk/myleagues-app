import { shallowMount } from "@vue/test-utils";

import moxios from "moxios";
import { Api } from "@/api";
import { Helpers } from "./../helpers.js";

import { store } from "@/store";
import { router } from "@/router";

import CallbackPage from "@/views/CallbackPage.vue";

describe("CallbackPage", () => {
  let wrapper;
  let helpers;

  beforeEach(() => {
    moxios.install(Api);
    helpers = new Helpers();

    // Define the wrapper
    wrapper = shallowMount(CallbackPage, {
      global: {
        plugins: [store, router],
      },
    });
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("Shall process the callback with the backend API.", async () => {
    let accessToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJteWxlYWd1ZXMtYXBpIiwiZXhwIjoxNjQwODgwMDgyLjE3Mzc4MzMsInVzZXJfaWQiOiJjMzI5MmE5YS1iZmFhLTQ2MzctODQwZC0zZjUyM2UwNzMwM2IiLCJ1c2VybmFtZSI6InNqai52b25rMSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHak9yM2YtcTBud3hvY1YtdThTZmhCTElFcW1ocmVXZE0ydUxTTF9XZz1zOTYtYyIsImxvY2FsZSI6Im5sIn0.A5XqCTZsvMqJUSX16F7mX3Je0bFf6PqidSXjdZ9FFvHdo0Muqmy2uUSVujHLxdtV7dF7ySKPJSHPqqL8wZlW7LVqvRiMM6eeac0Lqo_wHY2RunYw1HTKrtyW5SgbAkX24s_3VrZK9XERswvb5fBcsbM5jjiw3R4hi9pja_2pTBA7Ay1rd2jDisf5EtYpYMkp4Qxq8CyFJ73DojlM08PYZbN7jI_KF1yVjSPHKUDLQ2PRdRoRcSFIe0CdehUUxhuQBhAeYIhJUmlXQGoEuAM2JUgHQQQZXAXVaKzOMQJfM5t5hIeHqIJ4pdJm93qmIJr4VJNgWTkC59OawYCANMXVDQ";
    let queryParams = { test: "test" };

    let to = {
      query: queryParams,
    };

    moxios.stubRequest(`saml/callback?test=test`, {
      status: 200,
      response: {
        access_token: accessToken,
      },
    });

    // Await for the backend to be called
    CallbackPage.beforeRouteEnter.call(wrapper.vm, to);
    await helpers.awaitMoxios();

    // Expect the access token to be stored
    expect(store.getters["user/accessToken"]).toBe(accessToken);

    // Expect the query params to be forwarded to the backend
    expect(moxios.requests.mostRecent().config.params).toStrictEqual(
      queryParams
    );
  });
});
