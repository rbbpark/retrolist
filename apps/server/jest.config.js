/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/__tests__/**/*.ts?(x)"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
};
