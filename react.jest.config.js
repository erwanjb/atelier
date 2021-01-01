module.exports = {
    transform: {
        "\\.[jt]sx?$": ["babel-jest", { 
            presets: [
                ['@babel/preset-env', {targets: {node: 'current'}}],
                '@babel/preset-typescript',
                "@babel/react"
            ] 
        }],
        ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
    },
    moduleFileExtensions: [
        "js",
        "ts",
        "json",
        "ts",
        "tsx",
      ],
      rootDir: "client",
      testRegex: ".*\\.test\\.tsx$",
      collectCoverageFrom: [
        "**/*.(t|j)sx"
      ],
      coverageDirectory: "../coverage",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: [__dirname + "/setup.jest.js"]
};
  