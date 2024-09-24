// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Get the default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Extract the existing assetExts and sourceExts from the default configuration
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // Exclude SVG files from the default assetExts
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    // Include SVG files in the sourceExts
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
