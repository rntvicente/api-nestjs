module.exports = {
  verbose: false,
  roots: ['<rootDir>/test'],
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
