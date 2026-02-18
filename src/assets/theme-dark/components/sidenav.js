// Custom Dashboard 2 MUI base styles
import colors from "assets/theme-dark/base/colors";
import borders from "assets/theme-dark/base/borders";

// Custom Dashboard 2 MUI helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { background } = colors;

const sidenav = {
  styleOverrides: {
    root: {
      width: pxToRem(284),
      whiteSpace: "nowrap",
      border: "none",
    },

    paper: {
      width: pxToRem(284),
      backgroundColor: background.dark,
      height: "100vh",
      margin: 0,
      borderRadius: 0,
      border: "none",
      borderRight: "1px solid #2c3f54",
    },

    paperAnchorDockedLeft: {
      borderRight: "none",
    },
  },
};

export default sidenav;
