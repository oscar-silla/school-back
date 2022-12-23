module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    modulePathIgnorePatterns: ["<rootDir>/build/"]
};