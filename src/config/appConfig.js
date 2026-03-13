// ============================================================
// appConfig.js — App-wide configuration for Bao Han Portfolio
// ============================================================

const appConfig = {
  app: {
    name: 'Lưu Nguyễn Bảo Hân Portfolio',
    version: '1.0.0',
    author: 'Luu Nguyen Bao Han',
  },

  // Navigation routes (single-page sections mirrored as hash routes)
  navigation: {
    sections: [
      { id: 'home',        label: 'Home',        path: '/',            hash: '#home' },
      { id: 'experience',  label: 'Experience',  path: '/experience',  hash: '#experience' },
      { id: 'skills',      label: 'Skills',      path: '/skills',      hash: '#skills' },
      { id: 'portfolio',   label: 'Portfolio',   path: '/portfolio',   hash: '#portfolio' },
      { id: 'education',   label: 'Education',   path: '/education',   hash: '#education' },
      { id: 'contact',     label: 'Contact',     path: '/#contact-section', hash: '#contact-section' },
    ],
  },

  // Color palette tokens (mirrors tailwind.config.js)
  colors: {
    bg:          '#EFE8E0',
    blue:        '#203F9A',
    pink:        '#E84797',
    pastelBlue:  '#94C2DA',
    pastelPink:  '#E7A0CC',
    secondary:   '#4E7CB2',
  },

  // Animation presets shared across the app
  animation: {
    defaultDuration: 0.7,
    staggerDelay: 0.1,
    viewportMargin: '-80px',
  },
};

export default appConfig;
