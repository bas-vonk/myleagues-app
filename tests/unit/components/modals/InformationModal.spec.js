import { mount } from "@vue/test-utils";

import { i18n } from "@/locale";

import InformationModal from "@/components/modals/InformationModal.vue";

describe("Information Modal", () => {
  let mountOptions;
  let wrapper;

  beforeEach(() => {
    mountOptions = {
      attachTo: document.body,
      props: {
        showModal: false,
      },
      global: {
        plugins: [i18n],
      },
    };

    wrapper = mount(InformationModal, mountOptions);
  });

  it("Shall render an information modal that is laid over the application.", async () => {
    // Open the modal
    await wrapper.setProps({ showModal: true });
    expect(document.body.classList).toContain("modal-open");

    // Close the modal
    await wrapper.setProps({ showModal: false });
    expect(document.body.classList).not.toContain("modal-open");
  });

  it("Shall close when you click outside the modal.", async () => {
    // Simulate a click outside the modal
    let event = {
      target: "A",
      currentTarget: "A",
    };
    wrapper.vm.clickOnModal(event);

    // Capture the emitted events
    let emittedEvents = wrapper.emitted();

    // Check whether 'submit' is there
    expect(emittedEvents).toHaveProperty("closingClick");
  });

  it("Shall not close when you click inside the modal.", async () => {
    // Simulate a click inside the modal
    let event = {
      target: "A",
      currentTarget: "B",
    };
    wrapper.vm.clickOnModal(event);

    // Capture the emitted events
    let emittedEvents = wrapper.emitted();

    // Check whether 'submit' is there
    expect(emittedEvents).not.toHaveProperty("closingClick");
  });
});
