import { mount } from "@vue/test-utils";
import LoginRegisterForm from "@/components/forms/LoginRegisterForm.vue";

describe("LoginRegisterForm.vue", () => {
  let wrapper;

  let username = "root";
  let password = "root";
  let passwordConfirmation = "root";
  let mode = "login";

  beforeEach(() => {
    wrapper = mount(LoginRegisterForm);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("Shall toggle between login and register mode.", async () => {
    // Trigger the toggle to register mode
    await wrapper.find("small").trigger("click");

    // Check whether 'toggleMode' is emitted
    expect(wrapper.emitted()).toHaveProperty("toggleMode");
    expect(wrapper.vm.mode).toBe("register");
  });

  it("Shall have a form that collects and emits login data.", async () => {
    // Fill in the form
    await wrapper.findAll("input").at(0).setValue(username);
    await wrapper.findAll("input").at(1).setValue(password);

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    // Capture the emitted events
    let emittedEvents = wrapper.emitted();

    // Check whether 'submit' is there
    expect(emittedEvents).toHaveProperty("submit");
    expect(emittedEvents.submit[0][0]).toStrictEqual({
      mode: mode,
      username: username,
      password: password,
      passwordConfirmation: undefined,
    });
  });

  it("Shall have a form that collects and emits register data.", async () => {
    // Trigger the toggle to register mode (and back to login, and back to register)
    await wrapper.find("small").trigger("click");
    await wrapper.find("small").trigger("click");
    await wrapper.find("small").trigger("click");

    // Fill in the form
    await wrapper.findAll("input").at(0).setValue(username);
    await wrapper.findAll("input").at(1).setValue(password);
    await wrapper.findAll("input").at(2).setValue(passwordConfirmation);

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    // Capture the emitted events
    let emittedEvents = wrapper.emitted();

    // Check whether 'submit' is there
    expect(emittedEvents).toHaveProperty("submit");
    expect(emittedEvents.submit[0][0]).toStrictEqual({
      mode: "register",
      username: username,
      password: password,
      passwordConfirmation: passwordConfirmation,
    });
  });
});
