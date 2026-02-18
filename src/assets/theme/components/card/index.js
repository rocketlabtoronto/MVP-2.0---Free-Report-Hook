// Custom Dashboard 2 MUI Base Styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";

// Custom Dashboard 2 MUI Helper Function
import rgba from "assets/theme/functions/rgba";

const { black, white } = colors;
const { borderWidth, borderRadius } = borders;
const { cardBoxShadow } = boxShadows;

const card = {
  styleOverrides: {
    root: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      backgroundColor: white.main,
      backgroundClip: "border-box",
      border: `1px solid #d6d9de`,
      borderTop: `2px solid #0d1b2a`,
      borderRadius: 0,
      boxShadow: "none",
    },
  },
};

export default card;
