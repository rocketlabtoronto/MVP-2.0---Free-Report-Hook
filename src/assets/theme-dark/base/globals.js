// Custom Dashboard 2 MUI Base Styles
import colors from "assets/theme-dark/base/colors";

const { info, dark, background } = colors;
const boardroomFontFamily = '"Source Serif 4", "Baskerville", "Georgia", "Times New Roman", serif';

const globals = {
  html: {
    scrollBehavior: "smooth",
  },
  body: {
    backgroundColor: background.default,
    color: dark.main,
    fontFamily: boardroomFontFamily,
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${dark.main} !important`,
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${info.main} !important`,
  },
  ".ag-theme-alpine, .ag-theme-alpine .ag-root-wrapper": {
    fontFamily: boardroomFontFamily,
  },
  ".ag-theme-alpine": {
    "--ag-font-family": boardroomFontFamily,
    "--ag-header-height": "52px",
    "--ag-row-height": "48px",
    "--ag-font-size": "15px",
    "--ag-header-font-weight": "600",
  },
  hr: {
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,
  },
};

export default globals;
