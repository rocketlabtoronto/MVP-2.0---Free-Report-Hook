import React from "react";
import PropTypes from "prop-types";
import DashboardLayout from "ui/LayoutContainers/DashboardLayout";
import DashboardNavbar from "ui/Navbars/DashboardNavbar";
import CustomBox from "components/CustomBox";
import CustomTypography from "components/CustomTypography";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";

const COMPANY_NAME    = "LookThroughProfits, Inc.";
const COMPANY_ADDRESS = "169 Madison Ave STE 38180, New York, NY 10016, USA";
const SUPPORT_EMAIL   = "howard@stockownerreport.com";

export default function LegalDocumentLayout({ title, effectiveDate, hideMetadata, children }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      {/* Page wash */}
      <CustomBox
        py={{ xs: 3, md: 5 }}
        px={{ xs: 1, md: 3 }}
        sx={{ background: "#edf0f3", minHeight: "100vh" }}
      >
        <CustomBox display="flex" justifyContent="center">
          <Card
            elevation={0}
            sx={{
              borderRadius: 0,
              border: "1px solid #b8bec7",
              overflow: "hidden",
              maxWidth: 820,
              width: "100%",
              boxShadow: "0 2px 8px rgba(13,27,42,0.08), 0 8px 32px rgba(13,27,42,0.06)",
            }}
          >
            {/* ── Masthead ─────────────────────────────────────────── */}
            <CustomBox
              sx={{
                background: "#0d1b2a",
                px: { xs: "1.75rem", md: "3rem" },
                pt: "2rem",
                pb: "1.6rem",
              }}
            >
              {/* Eyebrow */}
              <CustomTypography
                sx={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  mb: "0.4rem",
                  display: "block",
                }}
              >
                {COMPANY_NAME}
              </CustomTypography>

              {/* Document title */}
              <CustomTypography
                variant="h4"
                sx={{
                  color: "#ffffff",
                  fontSize: { xs: "1.35rem", md: "1.6rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  mb: 0,
                }}
              >
                {title}
              </CustomTypography>

              {/* Effective date tag */}
              {effectiveDate && (
                <CustomTypography
                  sx={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    mt: "0.65rem",
                    letterSpacing: "0.04em",
                    display: "block",
                  }}
                >
                  Effective {effectiveDate}
                </CustomTypography>
              )}
            </CustomBox>

            {/* Thin gold accent rule */}
            <CustomBox sx={{ height: "3px", background: "linear-gradient(to right, #c9a84c, #e8d5a3, #c9a84c)" }} />

            {/* ── Body ─────────────────────────────────────────────── */}
            <CustomBox
              sx={{
                background: "#ffffff",
                px: { xs: "1.75rem", md: "3rem" },
                pt: "2.25rem",
                pb: "2.75rem",
              }}
            >
              {!hideMetadata && (
                <CustomBox
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    rowGap: "0.2rem",
                    mb: "2rem",
                    pb: "1.5rem",
                    borderBottom: "1px solid #d1d5db",
                  }}
                >
                  {[
                    ["Company",        COMPANY_NAME],
                    ["Address",        COMPANY_ADDRESS],
                    ["Contact",        null],
                  ].map(([label, value]) => (
                    <React.Fragment key={label}>
                      <CustomTypography
                        sx={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: "#6b7280",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          lineHeight: 1.9,
                        }}
                      >
                        {label}
                      </CustomTypography>
                      <CustomTypography sx={{ fontSize: 12.5, color: "#1f2937", lineHeight: 1.9 }}>
                        {label === "Contact" ? (
                          <Link
                            href={`mailto:${SUPPORT_EMAIL}`}
                            sx={{ color: "#0d1b2a", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                          >
                            {SUPPORT_EMAIL}
                          </Link>
                        ) : value}
                      </CustomTypography>
                    </React.Fragment>
                  ))}
                </CustomBox>
              )}

              {children}
            </CustomBox>
          </Card>
        </CustomBox>
      </CustomBox>
    </DashboardLayout>
  );
}

LegalDocumentLayout.propTypes = {
  title: PropTypes.string.isRequired,
  effectiveDate: PropTypes.string,
  hideMetadata: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
