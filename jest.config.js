const config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(scss|sass|css)$": "identity-obj-proxy"
    }
};

module.exports = config;

