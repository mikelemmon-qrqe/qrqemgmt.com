// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['ReactJS-Upload/src/setupTests.js'], // Optional: for @testing-library/jest-dom
    moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Optional: for CSS Modules
    },
    // Add other Jest configurations as needed
};