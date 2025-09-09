module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  verbose: true,
  testTimeout: 30000, // 30 seconds to accommodate Docker build time
};
