import React from "react";
import PropTypes from "prop-types";
import DashboardLayout from "ui/LayoutContainers/DashboardLayout";
import DashboardNavbar from "ui/Navbars/DashboardNavbar";
import CustomBox from "components/CustomBox";
import CustomTypography from "components/CustomTypography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";

const COMPANY_NAME = "LookThroughProfits, Inc.";
const COMPANY_ADDRESS = "169 Madison Ave STE 38180, New York, NY 10016, USA";
const SUPPORT_EMAIL = "howard@stockownerreport.com";

export default function LegalDocumentLayout({ title, effectiveDate, children }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CustomBox py={4} px={{ xs: 2, md: 4 }}>
        <CustomBox display="flex" justifyContent="center">
          <Card
            sx={{
              p: { xs: 3, md: 4 },
              background: "background.paper",
              borderRadius: 3,
              boxShadow: 6,
              border: "1px solid",
              borderColor: "divider",
              maxWidth: 960,
              width: "100%",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: (theme) =>
                  `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              },
              "& .MuiTypography-caption": {
                fontSize: "0.9375rem",
                lineHeight: 1.55,
                color: "text.primary",
              },
              "& .MuiTypography-h6": {
                fontSize: "1.25rem",
                lineHeight: 1.3,
              },
            }}
          >
            <CustomTypography variant="h4" fontWeight="bold" color="text" gutterBottom>
              {title}
            </CustomTypography>

            <CustomTypography variant="caption" color="text" display="block" sx={{ lineHeight: 1.7 }}>
              Effective Date: {effectiveDate}
            </CustomTypography>
            <CustomTypography variant="caption" color="text" display="block" sx={{ lineHeight: 1.7 }}>
              Company: {COMPANY_NAME}
            </CustomTypography>
            <CustomTypography variant="caption" color="text" display="block" sx={{ lineHeight: 1.7 }}>
              Address: {COMPANY_ADDRESS}
            </CustomTypography>
            <CustomTypography variant="caption" color="text" display="block" sx={{ lineHeight: 1.7, mb: 1 }}>
              Contact: <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>
            </CustomTypography>

            <Divider sx={{ my: 2 }} />

            {children}
          </Card>
        </CustomBox>
      </CustomBox>
    </DashboardLayout>
  );
}

LegalDocumentLayout.propTypes = {
  title: PropTypes.string.isRequired,
  effectiveDate: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
