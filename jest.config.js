module.exports = {
    'roots': [
        '<rootDir>'
    ],
    'transform': {
        '^.+\\.(tsx|ts)$': 'ts-jest',
    },
    'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|jsx)?$',
    'moduleFileExtensions': [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
        'css',
        'scss',
    ],
    'snapshotSerializers': ['enzyme-to-json/serializer'],
    'transformIgnorePatterns': [
        "<rootDir>/node_modules/(?!lodash-es)"
    ],
    'testURL': "http://localhost",
    'collectCoverage': false,
    'collectCoverageFrom': [
        "<rootDir>/src/**/*.{ts,tsx,js,jsx}",
    ],
};
