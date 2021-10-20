import { mount } from "@vue/test-utils";
import SubmitMatchResultForm from "@/components/forms/SubmitMatchResultForm.vue";

const wrapper = mount(SubmitMatchResultForm, {
  propsData: {
    players: [
      {
        id: "ab-10",
        username: "andre",
      },
      {
        id: "ab-20",
        username: "bas",
      },
      {
        id: "ab-30",
        username: "carl",
      },
    ],
  },
});

describe("SubmitMatchResultForm.vue", () => {
  it("Tests the watchers that check that players don't play themselves.", async () => {
    // Set the first dropdown to "andre" with value "10"
    await wrapper.findAll("select").at(0).findAll("option").at(1).setSelected();
    expect(wrapper.findAll("option:checked").at(0).element.value).toBe("ab-10");

    // Now set the second dropdown to "andre" and check whether the first dropdown is reset
    await wrapper.findAll("select").at(1).findAll("option").at(1).setSelected();
    expect(wrapper.findAll("option:checked").at(1).element.value).toBe("ab-10");
    expect(wrapper.findAll("option:checked").at(0).element.value).toBe("");

    // Now set the first dropdown to "andre" and check whether the second dropdown is reset
    await wrapper.findAll("select").at(0).findAll("option").at(1).setSelected();
    expect(wrapper.findAll("option:checked").at(0).element.value).toBe("ab-10");
    expect(wrapper.findAll("option:checked").at(1).element.value).toBe("");
  });

  it("Tests whether the formData gets emitted.", async () => {
    // Set values
    let expectedForm = {
      homePlayerId: "ab-20",
      homePlayerScore: 1,
      awayPlayerId: "ab-10",
      awayPlayerScore: 2,
      date: "2021-10-20",
    };

    wrapper.findAll("select").at(0).setValue(expectedForm.homePlayerId);
    wrapper.findAll("select").at(1).setValue(expectedForm.awayPlayerId);
    wrapper.findAll("input").at(0).setValue(expectedForm.homePlayerScore);
    wrapper.findAll("input").at(1).setValue(expectedForm.awayPlayerScore);
    wrapper.findAll("input").at(2).setValue(expectedForm.date);

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    // Capture the emitted events
    let emittedEvents = wrapper.emitted();

    // Check whether 'submit' is there
    expect(emittedEvents).toHaveProperty("submit");
    expect(emittedEvents.submit[0][0]).toStrictEqual(expectedForm);
  });
});
