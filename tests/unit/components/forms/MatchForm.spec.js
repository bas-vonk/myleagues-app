import { mount } from "@vue/test-utils";
import MatchForm from "@/components/forms/MatchForm.vue";

describe("MatchForm.vue", () => {
  it("Renders the form to submit a match,", () => {
    const wrapper = mount(MatchForm);

    // Simply check whether a SVG is outputted
    expect(wrapper.html().includes("<div")).toBe(true);
    expect(wrapper.html().includes("</div>")).toBe(true);
  });
});
