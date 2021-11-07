import { mount } from "@vue/test-utils";

import { i18n } from "@/locale";
import CreateLeagueForm from "@/components/forms/CreateLeagueForm.vue";
import InformationModal from "@/components/modals/InformationModal.vue";

describe("CreateLeagueForm.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CreateLeagueForm, { global: { plugins: [i18n] } });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("Shall collect and emit form data for a new league.", async () => {
    let leagueName = "Test league";
    let rankingSystem = "regular";

    // Fill in the form
    await wrapper.findAll("input").at(0).setValue(leagueName);
    await wrapper.findAll("select").at(0).findAll("option").at(1).setSelected();

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    // Capture the emitted events
    let emittedEvents = wrapper.emitted();

    // Check whether 'submit' is there
    expect(emittedEvents).toHaveProperty("submit");
    expect(emittedEvents.submit[0][0]).toStrictEqual({
      leagueName: leagueName,
      rankingSystem: rankingSystem,
    });
  });

  it("Shall open a modal when the information icon is clicked.", async () => {
    // Togle info icon
    wrapper.find("svg").trigger("click");
    expect(wrapper.vm.showModal).toBe(true);

    // Have the info modal emit the 'close event'
    wrapper.findComponent(InformationModal).vm.$emit("closingClick");
    expect(wrapper.vm.showModal).toBe(false);
  });
});
