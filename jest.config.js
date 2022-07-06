module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.test.{ts,tsx}', '!**/dist/**'],
  coverageThreshold: {
    global: {
      lines: 70
    }
  }
}
