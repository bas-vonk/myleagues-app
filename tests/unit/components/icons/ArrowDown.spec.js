import { mount } from "@vue/test-utils";
import ArrowDown from "@/components/icons/ArrowDown.vue";

describe("ArrowDown.vue", () => {
  it("Shall render an arrow down icon.", () => {
    const wrapper = mount(ArrowDown);

    // Simply check whether a SVG is outputted
    expect(wrapper.html().includes("<svg")).toBe(true);
    expect(wrapper.html().includes("</svg>")).toBe(true);
  });
});
