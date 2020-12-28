module.exports = {
    transform: {
        "\\.[jt]sx?$": ["ts-jest", { configFile: './nest.tsconfig.jsson' }]
    },
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
      ],
      rootDir: "server",
      testRegex: ".*\\.test\\.ts$",
      collectCoverageFrom: [
        "**/*.(t|j)s"
      ],
      coverageDirectory: "../coverage",
      testEnvironment: "node",
      globals: {
        "ts-jest": {
          tsconfig: "nest.tsconfig.json"
        }
    }
};