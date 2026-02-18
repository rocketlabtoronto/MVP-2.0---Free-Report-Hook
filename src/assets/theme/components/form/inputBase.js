// Custom Dashboard 2 MUI Base Styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

// Soft UI Dashboard PRO helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { dark, white, grey, inputColors } = colors;
const { size, fontWeightRegular, fontFamily } = typography;
const { borderWidth, borderRadius } = borders;

const inputBase = {
  styleOverrides: {
    root: {
      display: "flex !important",
      alignItems: "center !important",
      width: "100% !important",
      height: "auto !important",
      padding: `${pxToRem(10)} ${pxToRem(14)}`,
      fontFamily: `${fontFamily} !important`,
      fontSize: `${size.sm} !important`,
      fontWeight: `${fontWeightRegular} !important`,
      lineHeight: "1.4 !important",
      color: `${grey[700]} !important`,
      backgroundColor: `${white.main} !important`,
      backgroundClip: "padding-box !important",
      border: `${borderWidth[1]} solid rgba(148, 163, 184, 0.35)`,
      appearance: "none !important",
      borderRadius: borderRadius.lg,
      transition: "box-shadow 150ms ease, border-color 150ms ease, padding 150ms ease !important",

      "&:focus-within": {
        border: `${borderWidth[1]} solid rgba(148, 163, 184, 0.35)`,
        boxShadow: "none",
      },
    },

    input: {
      width: "100% !important",
      height: pxToRem(22),
      fontFamily: `${fontFamily} !important`,
      paddingTop: "0 !important",
      paddingRight: "0 !important",
      paddingBottom: "0 !important",
      paddingLeft: pxToRem(6),

      "&::-webkit-input-placeholder": {
        fontFamily: `${fontFamily} !important`,
        color: `${dark.main} !important`,
      },

      "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus": {
        WebkitTextFillColor: `${grey[700]} !important`,
        fontFamily: `${fontFamily} !important`,
      },
    },
  },
};

export default inputBase;
