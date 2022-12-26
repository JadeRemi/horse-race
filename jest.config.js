module.exports = async function config() {
  return {
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFiles: ['dotenv/config'],
    testEnvironment: 'jsdom',
    testRegex: '__tests__/.+\\.test\\.js',
    transform: {
      '^.+\\.js(x?)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!uuid)',
    ],
  };
};
