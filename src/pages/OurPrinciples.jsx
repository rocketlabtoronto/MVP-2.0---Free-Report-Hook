import PropTypes from "prop-types";
import DashboardLayout from "ui/LayoutContainers/DashboardLayout";
import DashboardNavbar from "ui/Navbars/DashboardNavbar";
import CustomBox from "components/CustomBox";
import CustomTypography from "components/CustomTypography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";

const P = ({ children }) => (
  <CustomTypography
    paragraph
    sx={{ lineHeight: 1.8, fontSize: 15, color: "#4B5563", mb: 2 }}
  >
    {children}
  </CustomTypography>
);

P.propTypes = { children: PropTypes.node.isRequired };

export default function OurPrinciples() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CustomBox py={4} px={{ xs: 2, md: 4 }}>
        <CustomBox display="flex" justifyContent="center">
          <Card
            sx={{
              p: { xs: 3, md: 5 },
              background: "#fff",
              borderRadius: 0,
              boxShadow: "0 2px 12px rgba(13,27,42,0.08)",
              border: "1px solid #d6d9de",
              borderTop: "3px solid #0d1b2a",
              maxWidth: 780,
              width: "100%",
            }}
          >
            <CustomTypography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#0d1b2a", fontSize: "1.5rem", letterSpacing: "-0.5px", mb: 0.5 }}
            >
              Our Principles
            </CustomTypography>
            <CustomTypography sx={{ fontSize: 13, color: "#9CA3AF", mb: 3 }}>
              A letter from our founder
            </CustomTypography>

            <Divider sx={{ mb: 3.5, borderColor: "#d6d9de" }} />

            <P>
              I started The Stock Owner&apos;s Report because I wanted a better way to understand
              what I actually owned. Not just tickers and prices—but the real businesses underneath:
              the earnings, the balance sheets, the economics. The kind of clarity a business owner
              has about their company, applied to a portfolio of common stocks.
            </P>

            <P>
              That mission shapes how I think about building this product. Accuracy matters more
              than polish. When our numbers depend on model inputs or third-party data, I want us to
              say so clearly—not bury it. If something is approximate, we&apos;ll call it
              approximate. I&apos;d rather we understate confidence than overstate it.
            </P>

            <P>
              On privacy: The Stock Owner&apos;s Report is an analytics platform, not a brokerage.
              We don&apos;t hold your assets. Brokerage connections run through SnapTrade&apos;s
              authorization flow, and our goal is to never touch your login credentials. We only
              keep what&apos;s necessary to serve you, and we&apos;re building toward stronger
              controls as the platform grows.
            </P>

            <P>
              This tool is built for clarity and informed ownership—not to tell you what to buy or
              sell, and not to encourage speculation. The reports are meant to help you think like a
              business owner, not to replace your judgment.
            </P>

            <P>
              We&apos;ll operate legally, respond to valid legal process as required, and take abuse
              of the platform seriously. As we scale, we&apos;ll formalize those procedures and be
              transparent about them.
            </P>

            <P>
              My commitment is simple: earn your trust through disciplined execution, honest
              communication, and continuous improvement—release by release. That&apos;s what
              I&apos;m here to do.
            </P>

            <Divider sx={{ my: 3.5, borderColor: "#d6d9de" }} />

            <CustomTypography sx={{ fontSize: 14.5, color: "#4B5563", display: "block", mb: 0.5 }}>
              Sincerely,
            </CustomTypography>
            <CustomTypography
              sx={{ fontSize: 15, fontWeight: 700, color: "#0d1b2a", display: "block", mt: 1 }}
            >
              Howard Lin
            </CustomTypography>
            <CustomTypography sx={{ fontSize: 13.5, color: "#6B7280", display: "block" }}>
              Founder, The Stock Owner&apos;s Report
            </CustomTypography>
          </Card>
        </CustomBox>
      </CustomBox>
    </DashboardLayout>
  );
}
