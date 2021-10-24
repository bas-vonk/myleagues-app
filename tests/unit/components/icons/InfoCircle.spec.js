import { mount } from "@vue/test-utils";
import InfoCircle from "@/components/icons/InfoCircle.vue";

describe("InfoCircle.vue", () => {
  it("Shall render an arrow down icon.", () => {
    const wrapper = mount(InfoCircle);

    // Simply check whether a SVG is outputted
    expect(wrapper.html().includes("<svg")).toBe(true);
    expect(wrapper.html().includes("</svg>")).toBe(true);
  });
});
