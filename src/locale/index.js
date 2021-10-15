import { createI18n } from "vue-i18n/index";

import en from "./texts/en.js";
import nl from "./texts/nl.js";

const i18n = createI18n({
  locale: navigator.language.substring(0, 2),
  messages: {
    en,
    nl,
  },
  fallbackLocale: "en",
});

export { i18n };
