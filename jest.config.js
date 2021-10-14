module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,vue}"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0.5,
      lines: 1,
      statements: 1,
    },
  },
};
