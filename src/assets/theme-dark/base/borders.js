/**
 * The base border styles for the Custom Dashboard 2 MUI.
 * You can add new border width, border color or border radius using this file.
 * You can customized the borders value for the entire Custom Dashboard 2 MUI using thie file.
 */

// Custom Dashboard 2 MUI Base Styles
import colors from "assets/theme-dark/base/colors";

// Custom Dashboard 2 MUI Helper Functions
import pxToRem from "assets/theme-dark/functions/pxToRem";
import rgba from "assets/theme-dark/functions/rgba";

const { white } = colors;

const borders = {
  borderColor: rgba(white.main, 0.15),

  borderWidth: {
    0: 0,
    1: pxToRem(1),
    2: pxToRem(2),
    3: pxToRem(3),
    4: pxToRem(4),
    5: pxToRem(5),
  },

  // Goldman Sachs: minimal/sharp radius
  borderRadius: {
    xs: 0,
    sm: pxToRem(2),
    md: pxToRem(4),
    lg: pxToRem(4),
    xl: pxToRem(4),
    xxl: pxToRem(4),
    section: pxToRem(4),
  },
};

export default borders;
