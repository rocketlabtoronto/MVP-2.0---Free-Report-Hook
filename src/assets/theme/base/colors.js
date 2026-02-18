const colors = {
  // Goldman Sachs palette: navy, white, warm off-white, cool greys
  background: {
    default: "#f7f7f5",   // GS warm off-white page background
    dark: "#0d1b2a",      // GS navy dark panel
  },

  text: {
    main: "#0d1b2a",      // GS navy text
    focus: "#0d1b2a",
    secondary: "#5a6473", // GS mid-grey secondary text
  },

  transparent: {
    main: "transparent",
  },

  white: {
    main: "#ffffff",
    focus: "#ffffff",
  },

  black: {
    light: "#1a1a1a",
    main: "#000000",
    focus: "#000000",
  },

  primary: {
    main: "#0d1b2a",      // GS deep navy
    focus: "#1a3a5c",
  },

  secondary: {
    main: "#8c98a8",      // GS cool grey
    focus: "#8c98a8",
  },

  info: {
    main: "#1a3a5c",      // GS medium navy (links, CTAs)
    focus: "#0d1b2a",
  },

  success: {
    main: "#2a7a4b",      // muted green (GS-appropriate)
    focus: "#2a7a4b",
  },

  warning: {
    main: "#b56a00",      // muted amber
    focus: "#b56a00",
  },

  error: {
    main: "#b91c1c",      // muted red
    focus: "#b91c1c",
  },

  light: {
    main: "#eaecef",
    focus: "#eaecef",
  },

  dark: {
    main: "#0d1b2a",      // GS deep navy
    focus: "#051018",
  },

  grey: {
    100: "#f7f7f5",       // warm off-white
    200: "#eaecef",
    300: "#d6d9de",       // GS border grey
    400: "#c2c8d1",
    500: "#8c98a8",
    600: "#5a6473",
    700: "#3d4552",
    800: "#232b35",
    900: "#0d1b2a",
  },

  gradients: {
    primary: {
      main: "#0d1b2a",
      state: "#1a3a5c",
    },

    secondary: {
      main: "#5a6473",
      state: "#8c98a8",
    },

    info: {
      main: "#1a3a5c",
      state: "#2d5c8a",
    },

    success: {
      main: "#2a7a4b",
      state: "#358c5a",
    },

    warning: {
      main: "#b56a00",
      state: "#cc7a00",
    },

    error: {
      main: "#b91c1c",
      state: "#c72020",
    },

    light: {
      main: "#d6d9de",
      state: "#eaecef",
    },

    dark: {
      main: "#0d1b2a",
      state: "#051018",
    },
  },

  socialMediaColors: {
    facebook: {
      main: "#3b5998",
      dark: "#344e86",
    },

    twitter: {
      main: "#55acee",
      dark: "#3ea1ec",
    },

    instagram: {
      main: "#125688",
      dark: "#0e456d",
    },

    linkedin: {
      main: "#0077b5",
      dark: "#00669c",
    },

    pinterest: {
      main: "#cc2127",
      dark: "#b21d22",
    },

    youtube: {
      main: "#e52d27",
      dark: "#d41f1a",
    },

    vimeo: {
      main: "#1ab7ea",
      dark: "#13a3d2",
    },

    slack: {
      main: "#3aaf85",
      dark: "#329874",
    },

    dribbble: {
      main: "#ea4c89",
      dark: "#e73177",
    },

    github: {
      main: "#24292e",
      dark: "#171a1d",
    },

    reddit: {
      main: "#ff4500",
      dark: "#e03d00",
    },

    tumblr: {
      main: "#35465c",
      dark: "#2a3749",
    },
  },

  alertColors: {
    primary: {
      main: "#0d1b2a",
      state: "#1a3a5c",
      border: "#c2c8d1",
    },

    secondary: {
      main: "#5a6473",
      state: "#8c98a8",
      border: "#d6d9de",
    },

    info: {
      main: "#1a3a5c",
      state: "#2d5c8a",
      border: "#c2cfe0",
    },

    success: {
      main: "#2a7a4b",
      state: "#358c5a",
      border: "#b8dfc8",
    },

    warning: {
      main: "#b56a00",
      state: "#cc7a00",
      border: "#f0d8b0",
    },

    error: {
      main: "#b91c1c",
      state: "#c72020",
      border: "#f0c8c8",
    },

    light: {
      main: "#d6d9de",
      state: "#eaecef",
      border: "#f7f7f5",
    },

    dark: {
      main: "#0d1b2a",
      state: "#051018",
      border: "#c2c8d1",
    },
  },

  badgeColors: {
    primary: {
      background: "#e8edf2",
      text: "#0d1b2a",
    },

    secondary: {
      background: "#eaecef",
      text: "#5a6473",
    },

    info: {
      background: "#e8edf2",
      text: "#1a3a5c",
    },

    success: {
      background: "#d4eddf",
      text: "#2a7a4b",
    },

    warning: {
      background: "#f5e8d0",
      text: "#b56a00",
    },

    error: {
      background: "#f5d8d8",
      text: "#b91c1c",
    },

    light: {
      background: "#ffffff",
      text: "#8c98a8",
    },

    dark: {
      background: "#e8edf2",
      text: "#0d1b2a",
    },
  },

  inputColors: {
    borderColor: { main: "#d6d9de", focus: "#0d1b2a" },
    error: "#b91c1c",
    success: "#2a7a4b",
  },

  sliderColors: {
    thumb: { borderColor: "#d9d9d9" },
  },

  circleSliderColors: {
    background: "#d3d3d3",
  },

  tabs: {
    indicator: { boxShadow: "#ddd" },
  },
};

export default colors;
