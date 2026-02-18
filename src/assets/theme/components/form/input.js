// Custom Dashboard 2 MUI Base Styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Soft UI Dashboard PRO helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { inputColors } = colors;
const { borderWidth } = borders;

const input = {
  styleOverrides: {
    root: {
      display: "flex !important",
      padding: `${pxToRem(9)} ${pxToRem(12)}`,
      border: `1px solid #d6d9de`,
      borderRadius: `0 !important`,
      backgroundColor: "#ffffff",
      transition: "border-color 150ms ease",

      "& fieldset": {
        border: "none",
      },

      "&:focus-within": {
        border: `1px solid #0d1b2a`,
        boxShadow: "none",
        outline: "none",
      },

      "&:hover:not(:focus-within)": {
        borderColor: "#8c98a8",
      },
    },

    input: {
      height: pxToRem(22),
      width: "100% !important",
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      fontSize: pxToRem(14),
      color: "#0d1b2a",

      "&::placeholder": {
        color: "#8c98a8",
        opacity: 1,
      },
    },

    inputSizeSmall: {
      height: pxToRem(14),
    },
  },
};

export default input;
