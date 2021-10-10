import { mount } from "@vue/test-utils";
import ArrowUp from "@/components/icons/ArrowUp.vue";

describe("ArrowUp.vue", () => {
  it("Renders an arrow up icon.", () => {
    const wrapper = mount(ArrowUp);

    // Simply check whether a SVG is outputted
    expect(wrapper.html().includes("<svg")).toBe(true);
    expect(wrapper.html().includes("</svg>")).toBe(true);
  });
});
