import { mount } from "@vue/test-utils";

import BaseCard from "@/components/ui/BaseCard.vue";

describe("The Base Card template", () => {
  let mountOptions = {
    props: { showScrollIcons: true },
    slots: {
      default: '<div id="testDiv">Large content.</div>',
      header: "Header",
    },
  };

  it("Shall display scroll icons when content doesn't fit the card.", async () => {
    var scrollTop;
    var maxScrollTop;

    let wrapper = mount(BaseCard, mountOptions);

    // Scenario: scroll down all the way to the bottom
    scrollTop = 10;
    maxScrollTop = 10;
    wrapper.vm.activateIcons(scrollTop, maxScrollTop);
    expect(wrapper.vm.showLessIcon).toBe(true);
    expect(wrapper.vm.showMoreIcon).toBe(false);

    // Scenario: scroll down but NOT at all the way to the bottom
    scrollTop = 10;
    maxScrollTop = 20;
    wrapper.vm.activateIcons(scrollTop, maxScrollTop);
    expect(wrapper.vm.showLessIcon).toBe(true);
    expect(wrapper.vm.showMoreIcon).toBe(true);

    // Scenario: all the way at the top, more content to be found
    scrollTop = 0;
    maxScrollTop = 10;
    wrapper.vm.activateIcons(scrollTop, maxScrollTop);
    expect(wrapper.vm.showLessIcon).toBe(false);
    expect(wrapper.vm.showMoreIcon).toBe(true);

    // Scenario: all the way at the top, NOT more content to be found
    scrollTop = 0;
    maxScrollTop = 0;
    wrapper.vm.activateIcons(scrollTop, maxScrollTop);
    expect(wrapper.vm.showLessIcon).toBe(false);
    expect(wrapper.vm.showMoreIcon).toBe(false);
  });

  it("Shall hide the scroll icons by default.", () => {
    let wrapper = mount(BaseCard);
    expect(wrapper.vm.showScrollIcons).toBe(false);
  });
});
