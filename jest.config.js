module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(@apollo-angular|@angular|@ngrx|ng2-pdf-viewer|primeng|uuid|highcharts-angular|angular-highcharts|@angular/localize/init|rxjs|zone.js))",
  ],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json", // Ensure Jest knows how to handle TypeScript
      stringifyContentPathRegex: "\\.(html|svg)$",
    },
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./",
        outputName: "junit.xml",
      },
    ],
  ],
};
