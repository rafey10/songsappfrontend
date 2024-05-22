import type { JestConfigWithTsJest } from 'ts-jest';
// import { defaults as tsjPreset } from 'ts-jest/presets';

const config: JestConfigWithTsJest = {
  roots: ['<rootDir>/src'],
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  // transform: {
  //   ...tsjPreset.transform,
  //   '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
  //     '<rootDir>/config/jest/fileTransform.js',
  // },
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
};

export default config;
