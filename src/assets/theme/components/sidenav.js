// Custom Dashboard 2 MUI base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Custom Dashboard 2 MUI helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { white } = colors;

const sidenav = {
  styleOverrides: {
    root: {
      width: pxToRem(284),
      whiteSpace: "nowrap",
      border: "none",
    },

    paper: {
      width: pxToRem(284),
      backgroundColor: white.main,
      height: "100vh",
      margin: 0,
      borderRadius: 0,
      border: "none",
      borderRight: "1px solid #d6d9de",
    },

    paperAnchorDockedLeft: {
      borderRight: "none",
    },
  },
};

export default sidenav;
