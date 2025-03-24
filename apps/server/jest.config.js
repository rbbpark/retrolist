/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/__tests__/**/*.ts?(x)"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
};
