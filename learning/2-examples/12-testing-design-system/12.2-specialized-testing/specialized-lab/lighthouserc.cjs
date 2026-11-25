// Review-only; @lhci/cli is intentionally not installed or executed in this lab.
module.exports = {
  ci: {
    collect: {
      url: ["http://127.0.0.1:4543/"],
      numberOfRuns: 3,
      settings: { chromeFlags: "--headless" },
    },
    assert: {
      assertions: {
        "categories:performance": [
          "warn",
          { minScore: 0.9, aggregationMethod: "median" },
        ],
        "total-byte-weight": [
          "error",
          { maxNumericValue: 200000, aggregationMethod: "median" },
        ],
      },
    },
    upload: { target: "filesystem", outputDir: "./artifacts/lhci" },
  },
};
