import moxios from "moxios";

export class Helpers {
  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  /**
   * Returns promise on moxios
   *
   *
   * @memberof Helpers
   */
  awaitMoxios = () => {
    return new Promise((resolve) => {
      moxios.wait(() => {
        resolve();
      });
    });
  };

  /**
   * Returns the base url for the api
   *
   * @memberof Helpers
   */
  baseUrl = () => {
    return process.env.VUE_APP_API_URI;
  };
}
