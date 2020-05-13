module.exports = {
    verbose: true,
    roots: [
        '<rootDir>/tests'
    ],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    globalSetup: './tests/cleanDB.ts',
    testEnvironment: 'node',
    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
        '\\\\node_modules\\\\'
    ],
}