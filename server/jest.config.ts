// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__tests__/**/*.test.ts'], // Test files pattern
  collectCoverage: true,                   // Enable coverage report
  collectCoverageFrom: ['src/**/*.ts'],    // Files to include in coverage
};

export default config;
