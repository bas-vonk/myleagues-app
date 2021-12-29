import { mount } from "@vue/test-utils";

import { store } from "@/store";
import moxios from "moxios";

import { Helpers } from "./../helpers.js";
import { userLoginRequest } from "./../data/requests/post_user_login.js";
import { userCreateRequest } from "./../data/requests/post_user_create.js";
import { userLoginResponse } from "./../data/responses/post_user_login.js";
import { userCreateResponse } from "./../data/responses/post_user_create.js";
import { leaguesResponse } from "./../data/responses/get_user_leagues.js";

import { Api } from "@/api";
import LoginPage from "@/views/LoginPage.vue";
import LoginRegisterForm from "@/components/forms/LoginRegisterForm.vue";

describe("LoginPage", () => {
  let wrapper;
  let helpers;

  beforeEach(() => {
    // Mock the API
    moxios.install(Api);
    helpers = new Helpers();

    wrapper = mount(LoginPage, {
      global: {
        plugins: [store],
      },
    });
  });

  afterEach(() => {
    moxios.uninstall(Api);
    wrapper.unmount();
  });

  it("Shall display a login/register form.", () => {
    expect(wrapper.findComponent(LoginRegisterForm)).toBeTruthy();
  });

  it("Shall redirect the user to the homepage if already logged in.", async () => {
    store.commit("user/setAccessToken", "access_token", { root: true });

    // Mock the next function
    let nextMock = jest.fn();

    // Manually call the beforeRouteEnter guard
    await LoginPage.beforeRouteEnter.call(wrapper.vm, null, null, nextMock);

    expect(nextMock).toHaveBeenCalledWith({ name: "home" });
  });

  it("Shall login a user.", async () => {
    moxios.stubRequest(`user/login`, {
      status: 200,
      response: userLoginResponse,
    });

    moxios.stubRequest(`user/leagues`, {
      status: 200,
      response: leaguesResponse,
    });

    // Fill in the form
    wrapper.findAll("input").at(0).setValue(userLoginRequest.username);
    wrapper.findAll("input").at(1).setValue(userLoginRequest.password);

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    // Check whether the right call was made
    let request = moxios.requests.mostRecent();
    expect(JSON.parse(request.config.data)).toStrictEqual(userLoginRequest);

    // Resolve all promises
    await helpers.awaitMoxios();

    // Check whether the access token was stored in the app
    let accessToken = store.getters["user/accessToken"];
    expect(accessToken).toBe(userLoginResponse.access_token);

    let leagues = store.getters["user_leagues/leagues"];
    expect(leagues).toStrictEqual(
      leaguesResponse.data.map((league) => league.attributes)
    );
  });

  it("Shall redirect to the Google Auth server.", async () => {
    let redirect_uri = "https://request_uri";

    moxios.stubRequest(`saml/get_request_uri/google`, {
      status: 200,
      response: {
        request_uri: redirect_uri,
      },
    });

    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: {
        href: "http://localhost",
      },
    });

    // Click the Google icon and wait
    wrapper.find("#googleIcon").trigger("click");
    await helpers.awaitMoxios();

    // Assert the changed location
    expect(window.location.href).toEqual(redirect_uri);
  });

  it("Shall render an error message upon failed login.", async () => {
    // Define the error message
    let errorMessage = "Something went wrong.";
    moxios.stubRequest(`user/login`, {
      status: 500,
      response: {
        message: errorMessage,
      },
    });

    // Fill in the form
    wrapper.findAll("input").at(0).setValue(userLoginRequest.username);
    wrapper.findAll("input").at(1).setValue(userLoginRequest.password);

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    // Resolve all promises
    await helpers.awaitMoxios();

    expect(wrapper.text()).toContain(errorMessage);
  });

  it("Shall register a user.", async () => {
    moxios.stubRequest(`user/register`, {
      status: 200,
      response: userCreateResponse,
    });

    // Toggle the register mode
    await wrapper.find("#modeSwitchText").trigger("click");

    // Fill in the form
    wrapper.findAll("input").at(0).setValue(userCreateRequest.username);
    wrapper.findAll("input").at(1).setValue(userCreateRequest.password);
    wrapper.findAll("input").at(2).setValue(userCreateRequest.password);

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    // Check whether the right call was made
    let request = moxios.requests.mostRecent();
    expect(JSON.parse(request.config.data)).toStrictEqual(userCreateRequest);

    // Resolve all promises
    await helpers.awaitMoxios();

    // Check whether the access token was stored in the app
    let accessToken = store.getters["user/accessToken"];
    expect(accessToken).toBe(userCreateResponse.access_token);
  });

  it("Shall render an error message upon failed registration.", async () => {
    // Define the error message
    let errorMessage = "Something went wrong.";
    moxios.stubRequest(`user/register`, {
      status: 500,
      response: {
        message: errorMessage,
      },
    });

    // Toggle the register mode
    await wrapper.find("#modeSwitchText").trigger("click");

    // Fill in the form
    wrapper.findAll("input").at(0).setValue(userCreateRequest.username);
    wrapper.findAll("input").at(1).setValue(userCreateRequest.password);
    wrapper.findAll("input").at(2).setValue(userCreateRequest.password);

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    // Resolve all promises
    await helpers.awaitMoxios();

    expect(wrapper.text()).toContain(errorMessage);
  });

  it("Shall render an error message when provided passwords don't match (upon registration).", async () => {
    // Toggle the register mode
    await wrapper.find("#modeSwitchText").trigger("click");

    // Fill in the form
    wrapper.findAll("input").at(0).setValue(userCreateRequest.username);
    wrapper.findAll("input").at(1).setValue(userCreateRequest.password);
    wrapper.findAll("input").at(2).setValue("different_confirmation_password");

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.text()).toContain(wrapper.vm.errorMessage);
  });
});
