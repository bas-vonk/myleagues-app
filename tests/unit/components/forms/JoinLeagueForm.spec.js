import { mount } from "@vue/test-utils";
import JoinLeagueForm from "@/components/forms/JoinLeagueForm.vue";

describe("JoinLeagueForm.vue", () => {
  let wrapper;

  beforeEach(() => {});

  afterEach(() => {
    wrapper.unmount();
  });

  it("Shall collect and emit a join code.", async () => {
    let joinCode = "ABCD";
    let props = {
      isFindLeagueView: true,
      isJoinLeagueView: false,
      leagueName: "",
      leagueId: "",
    };

    wrapper = mount(JoinLeagueForm, {
      props: props,
    });

    // Fill in the form
    await wrapper.findAll("input").at(0).setValue(joinCode);

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    // Capture the emitted events
    let emittedEvents = wrapper.emitted();

    // Check whether 'submit' is there
    expect(emittedEvents).toHaveProperty("submit");
    expect(emittedEvents.submit[0][0]).toStrictEqual({
      joinCode: joinCode,
      isJoinLeagueView: props.isJoinLeagueView,
      isFindLeagueView: props.isFindLeagueView,
      leagueId: props.leagueId,
    });
  });

  it("Shall collect and emit a 'join league' action.", async () => {
    let props = {
      isFindLeagueView: false,
      isJoinLeagueView: true,
      leagueName: "Test league",
      leagueId: "abc-123",
    };

    wrapper = mount(JoinLeagueForm, {
      props: props,
    });

    // Trigger the submit event
    await wrapper.find("form").trigger("submit.prevent");

    // Capture the emitted events
    let emittedEvents = wrapper.emitted();

    // Check whether 'submit' is there
    expect(emittedEvents).toHaveProperty("submit");
    expect(emittedEvents.submit[0][0]).toStrictEqual({
      joinCode: "",
      isJoinLeagueView: props.isJoinLeagueView,
      isFindLeagueView: props.isFindLeagueView,
      leagueId: props.leagueId,
    });
  });
});
