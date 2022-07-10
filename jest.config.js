module.exports = {
  verbose: false,
  roots: ['<rootDir>/src/'],
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
