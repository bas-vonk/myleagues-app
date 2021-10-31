import { shallowMount } from "@vue/test-utils";

import { store } from "@/store";

import LoginPage from "@/views/LoginPage.vue";
import LoginRegisterForm from "@/components/forms/LoginRegisterForm.vue";

describe("LoginPage", () => {
  it("Shall display a login/register form.", () => {
    let wrapper = shallowMount(LoginPage, { store });
    expect(wrapper.findComponent(LoginRegisterForm)).toBeTruthy();
  });

  it("Shall redirect the user to the homepage if already logged in.", async () => {
    store.commit("user/setAccessToken", "access_token", { root: true });
    let wrapper = shallowMount(LoginPage, { store });

    // Mock the next function
    let nextMock = jest.fn();

    // Manually call the beforeRouteEnter guard
    await LoginPage.beforeRouteEnter.call(wrapper.vm, null, null, nextMock);

    expect(nextMock).toHaveBeenCalledWith({ name: "home" });
  });
});
