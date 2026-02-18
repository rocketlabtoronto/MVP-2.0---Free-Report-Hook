// Custom Dashboard 2 MUI Base Styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

// Custom Dashboard 2 MUI Helper Functions
import pxToRem from "assets/theme/functions/pxToRem";

const { white, text, dark, secondary } = colors;
const { size } = typography;

const contained = {
  base: {
    backgroundColor: white.main,
    minHeight: pxToRem(38),
    color: text.main,
    boxShadow: "none",
    padding: `${pxToRem(9)} ${pxToRem(20)}`,
    borderRadius: 0,
    border: "1px solid #d6d9de",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontSize: pxToRem(12),
    fontWeight: 700,

    "&:hover": {
      backgroundColor: "#f7f7f5",
      boxShadow: "none",
      borderColor: "#0d1b2a",
    },

    "&:focus": {
      boxShadow: "none",
      outline: "2px solid #0d1b2a",
      outlineOffset: 1,
    },

    "&:active, &:active:focus, &:active:hover": {
      opacity: 0.9,
      boxShadow: "none",
    },

    "&:disabled": {
      boxShadow: "none",
      opacity: 0.45,
    },

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(16)} !important`,
    },
  },

  small: {
    minHeight: pxToRem(30),
    padding: `${pxToRem(6)} ${pxToRem(16)}`,
    fontSize: pxToRem(11),

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(12)} !important`,
    },
  },

  large: {
    minHeight: pxToRem(44),
    padding: `${pxToRem(12)} ${pxToRem(32)}`,
    fontSize: pxToRem(13),

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  primary: {
    backgroundColor: "#0d1b2a",
    color: white.main,
    border: "1px solid #0d1b2a",
    boxShadow: "none",

    "&:hover": {
      backgroundColor: "#1a3a5c",
      border: "1px solid #1a3a5c",
      boxShadow: "none",
    },

    "&:focus:not(:hover)": {
      backgroundColor: "#1a3a5c",
      boxShadow: "none",
    },
  },

  secondary: {
    backgroundColor: "#f7f7f5",
    color: "#0d1b2a",
    border: "1px solid #d6d9de",

    "&:hover": {
      backgroundColor: "#eaecef",
      border: "1px solid #0d1b2a",
    },

    "&:focus:not(:hover)": {
      backgroundColor: "#eaecef",
      boxShadow: "none",
    },
  },
};

export default contained;
