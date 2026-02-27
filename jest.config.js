/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");

// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require("./tsconfig");

module.exports = {
  //clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.[jt]s$": ["ts-jest", { diagnostics: false, tsconfig: { allowJs: true }, isolatedModules: true }]
  },
  // @actions/github 7+ nests pure-ESM @octokit packages under its own node_modules.
  // The double-lookahead prevents false matches at the *first* node_modules/ segment
  // when the path later contains node_modules/@octokit/:
  //   node_modules/@actions/github/node_modules/@octokit/auth-token/...
  //   ^--- 1st: skipped because .*node_modules/@octokit/ appears downstream
  //                              ^--- 2nd: skipped because starts with @octokit/
  transformIgnorePatterns: [
    "node_modules/(?!.*node_modules/@octokit/)(?!@octokit/)"
  ],
  verbose: true,
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  )
};
