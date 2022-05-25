module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': ['./src/components'],
          '@components/*': ['./src/components/*'],
          '@constants': ['./src/constants'],
          '@helpers': ['./src/helpers'],
          '@hooks': ['./src/hooks'],
          '@navigation': ['./src/navigation'],
          '@screens': ['./src/screens'],
          '@store': ['./src/store'],
          '@svgs': ['./src/assets/svgs'],
          '@svgs/*': ['./src/assets/svgs/*'],
          '@types': ['./src/types'],
        },
        extensions: ['.ts', '.tsx', '.png', '.svg'],
        root: ['./src'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
