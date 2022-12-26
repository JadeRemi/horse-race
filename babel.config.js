module.exports = function config() {
  const plugins = [
    ['babel-plugin-styled-components'],
  ];

  const presets = [
    ['@babel/preset-typescript'],
  ];

  return { plugins, presets };
};
