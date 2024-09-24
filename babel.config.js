module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    // [
    //   'module-resolver',
    //   {
    //     root: ['./src'],
    //     alias: {
    //       '@/screens': './src/screens',
    //       '@/components': './src/components',
    //     },
    //   },
    // ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        blocklist: null,
        allowlist: null,
        verbose: false,
      },
    ],
  ],
};
