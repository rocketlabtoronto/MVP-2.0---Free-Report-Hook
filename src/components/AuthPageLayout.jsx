import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

const baseWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: 24,
};

const baseCardStyle = {
  borderRadius: 16,
  padding: 28,
  maxWidth: 440,
  width: "100%",
};

const baseLogoStyle = {
  maxWidth: 150,
  height: "auto",
  border: "0px solid #eee",
  background: "#fff",
  borderRadius: 8,
  display: "inline-block",
};

export default function AuthPageLayout({
  logoSrc,
  logoAlt,
  children,
  wrapperStyle,
  cardStyle,
  logoStyle,
  logoPosition,
  showLogo,
}) {
  const theme = useTheme();
  const themedWrapperStyle = {
    background: `linear-gradient(145deg, ${theme.palette.grey[100]} 0%, ${theme.palette.background.default} 55%, ${theme.palette.primary.light}22 100%)`,
  };
  const themedCardStyle = {
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[8],
    position: "relative",
    overflow: "hidden",
  };

  const logo = showLogo ? (
    <div style={{ marginBottom: 24, textAlign: "center" }}>
      <img
        src={logoSrc}
        alt={logoAlt}
        style={{ ...baseLogoStyle, ...logoStyle }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://via.placeholder.com/180x50?text=Logo+Not+Found";
        }}
      />
    </div>
  ) : null;

  return (
    <div style={{ ...baseWrapperStyle, ...themedWrapperStyle, ...wrapperStyle }}>
      {logoPosition === "outside" && logo}
      <div style={{ ...baseCardStyle, ...themedCardStyle, ...cardStyle }}>
        <div
          style={{
            height: 4,
            width: "100%",
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        {logoPosition === "inside" && logo}
        {children}
      </div>
    </div>
  );
}

AuthPageLayout.propTypes = {
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  children: PropTypes.node.isRequired,
  wrapperStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  logoPosition: PropTypes.oneOf(["inside", "outside"]),
  showLogo: PropTypes.bool,
};

AuthPageLayout.defaultProps = {
  logoSrc: "/logos/logo_image.png",
  logoAlt: "LookThroughProfits Logo",
  wrapperStyle: {},
  cardStyle: {},
  logoStyle: {},
  logoPosition: "inside",
  showLogo: true,
};
