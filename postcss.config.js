export const plugins = {
  'postcss-preset-env': {
    autoprefixer: {
      overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'not dead']
    },
    stage: 3
  },
  'postcss-px-to-viewport': {
    unitToConvert: 'px',
    viewportWidth: 375,
    viewportHeight: 667,
    unitPrecision: 5,
    viewportUnit: 'vw',
    fontViewportUnit: 'vw',
    minPixelValue: 1,
    mediaQuery: false
  }
};
