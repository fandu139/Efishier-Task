module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  coverageDirectory: './coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./testenv.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native|@react-native-community/async-storage/(?!(lib))|react-native-maps|react-native-material-text-field-plus|react-content-loader)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
