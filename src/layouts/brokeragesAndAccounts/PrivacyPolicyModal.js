import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const META = [
  ["Company", "LookThroughProfits, Inc."],
  ["Address", "169 Madison Ave STE 38180, New York City 10016, United States"],
  ["Contact (Privacy)", "howard@stockownerreport.com"],
  ["Effective Date", "February 18, 2026"],
  ["Last Updated", "February 18, 2026"],
];

const SECTIONS = [
  {
    heading: "Overview",
    body: "This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit our website or use the Service.\n\nThe Service provides portfolio analytics that translate your brokerage holdings into an \"owner's view\" of what you own, including look-through, pro-rata estimates of business-level fundamentals derived from your holdings and public or licensed financial data sources.\n\nBy accessing or using the Service, you acknowledge that you have read and understood this Privacy Policy.",
  },
  {
    heading: "Definitions",
    body: "\"Personal Information\" means information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked (directly or indirectly) with you, your household, or your device.\n\n\"Brokerage Data\" means account and portfolio data made available to us through your authorized connection to your brokerage account (including holdings/positions and related account details).\n\n\"Sensitive Personal Information\" refers to certain categories of personal information that are treated as sensitive under some laws. We treat Brokerage Data as sensitive as a matter of best practice, even if a particular legal definition does not apply in your jurisdiction.",
  },
  {
    heading: "Scope",
    body: "This Privacy Policy applies to our website and associated pages and forms, and the Service, including any web app, authenticated product experience, and customer support interactions.\n\nThis Privacy Policy does not apply to third-party websites, brokerages, or third-party services you may access through links or integrations. Your use of third-party services is governed by their own terms and privacy policies.",
  },
  {
    heading: "Information We Collect",
    body: "Information you provide: account and profile information (name, email, password), subscription and billing information (processed by Stripe — we do not store full card numbers), and communications such as support requests and feedback.\n\nInformation collected automatically: device and usage data (IP address, browser type, pages viewed, interactions), and cookies or similar technologies.\n\nBrokerage Data: when you connect a brokerage, the connection flow is handled by SnapTrade. We do not ask for or intentionally collect your brokerage username or password. Once authorized, we may receive account identifiers, holdings and positions, balance and valuation data, and limited activity data if available and needed for Service functionality.",
  },
  {
    heading: "How We Use Information",
    body: "We use information to: provide and operate the Service; secure the Service (authentication, fraud detection, abuse prevention); improve and develop the Service; respond to customer support inquiries and send service notices; process billing and subscriptions; and comply with applicable law and enforce our terms.",
  },
  {
    heading: "Legal Bases for Processing",
    body: "Where required by applicable law, we process personal information based on: contract performance (to provide the Service); legitimate interests (securing and improving the Service, preventing fraud); consent (where required for certain cookies or marketing communications); and legal obligation (to comply with laws or lawful requests).",
  },
  {
    heading: "How We Disclose Information",
    body: "We do not sell or rent personal information.\n\nWe may disclose personal information to service providers that perform services on our behalf (payment processing, hosting, security, analytics, email delivery), subject to appropriate contracts.\n\nWhen you connect a brokerage account, the connection provider facilitates that connection under its own terms and privacy policy.\n\nWe may also disclose information to comply with law or legal process, protect rights and safety, in connection with a business transaction (merger, acquisition, or sale of assets), or when you direct us to do so.",
  },
  {
    heading: "Cookies and Similar Technologies",
    body: "We use cookies and similar technologies for strictly necessary purposes (authentication, security, session management), preferences, and analytics. You can manage cookies through your browser settings, but disabling some cookies may limit functionality.",
  },
  {
    heading: "Data Retention",
    body: "We retain personal information only as long as reasonably necessary for the purposes described in this Privacy Policy, including maintaining your account, providing the Service, complying with legal and regulatory obligations, and resolving disputes. Retention periods vary by data type and context.",
  },
  {
    heading: "Disconnection and Deletion",
    body: "You can disconnect your brokerage connection through available product controls or by contacting us. If you request account deletion, we will take reasonable steps to delete or de-identify your personal information, subject to lawful exceptions.",
  },
  {
    heading: "Security",
    body: "We implement administrative, technical, and physical safeguards designed to protect personal information. However, no security program is perfect. You are responsible for maintaining the confidentiality of your login credentials and for using appropriate security measures on your devices.",
  },
  {
    heading: "International Transfers",
    body: "We are based in the United States and may process and store information in the United States and other jurisdictions where we or our service providers operate. Where required by applicable law, we take steps designed to provide an appropriate level of protection for international transfers.",
  },
  {
    heading: "Your Rights and Choices",
    body: "Depending on where you live, you may have the right to: request access to personal information we hold; request correction of inaccurate information; request deletion (subject to lawful exceptions); object to or restrict certain processing; request portability; or withdraw consent.\n\nTo exercise rights, contact us at howard@stockownerreport.com. We may need to verify your identity before processing your request.",
  },
  {
    heading: "California and U.S. Privacy Rights",
    body: "California residents may have rights under California privacy law, including rights to know, delete, opt out of sale/sharing (including via a user-enabled global privacy control), non-discrimination, and rights to correct and limit use of sensitive personal information.\n\nIf we are required to recognize an opt-out preference signal (such as the Global Privacy Control), we will treat it as a valid opt-out request for the browser/device that sends the signal.",
  },
  {
    heading: "Canada",
    body: "If you are in Canada, you may have rights of access and correction and the right to challenge compliance, consistent with Canadian privacy laws including PIPEDA. For Québec residents, our Privacy Officer can be reached at howard@stockownerreport.com.",
  },
  {
    heading: "United Kingdom",
    body: "If you are in the United Kingdom, privacy rights and notice expectations generally arise under the UK GDPR and the Data Protection Act 2018.",
  },
  {
    heading: "Marketing Communications",
    body: "If we send promotional communications, you can opt out by using the unsubscribe mechanism in those messages or by contacting us. We may still send non-promotional service-related messages.",
  },
  {
    heading: "Children's Privacy",
    body: "The Service is not directed to children, and we do not knowingly collect personal information from individuals under 18. If you believe a child has provided personal information, contact us and we will take appropriate steps.",
  },
  {
    heading: "Changes to This Privacy Policy",
    body: "We may update this Privacy Policy from time to time. The \"Last Updated\" date at the top indicates when it was most recently revised. If we make material changes, we will take reasonable steps to provide notice.",
  },
  {
    heading: "Contact Us",
    body: "LookThroughProfits, Inc.\nAttn: Privacy Officer\n169 Madison Ave STE 38180\nNew York, NY 10016, United States\nhoward@stockownerreport.com",
  },
];

export default function PrivacyPolicyModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper"
      PaperProps={{ sx: { borderRadius: 0, boxShadow: "0 4px 24px rgba(13,27,42,0.12)" } }}
    >
      <DialogTitle sx={{
        fontWeight: 700,
        fontSize: 18,
        color: "#0d1b2a",
        borderBottom: "1px solid #d6d9de",
        pb: 1.5,
      }}>
        Privacy Policy
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 12, top: 10, color: "#9CA3AF", "&:hover": { color: "#0d1b2a", background: "none" } }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2.5 }}>
        <Box sx={{ mb: 2.5, p: 1.5, background: "#F9FAFB", border: "1px solid #d6d9de" }}>
          {META.map(([label, value]) => (
            <Box key={label} sx={{ display: "flex", gap: 1, mb: 0.5 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#111827", minWidth: 140, textTransform: "uppercase", letterSpacing: 0.6 }}>
                {label}
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: "#4B5563" }}>{value}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {SECTIONS.map(({ heading, body }, i) => (
            <Box key={heading}>
              {i > 0 && <Divider sx={{ mb: 2, borderColor: "#d6d9de" }} />}
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#111827", mb: 0.75, textTransform: "uppercase", letterSpacing: 0.8 }}>
                {heading}
              </Typography>
              {body.split("\n\n").map((para, pi) => (
                <Typography key={pi} sx={{ fontSize: 13.5, color: "#4B5563", lineHeight: 1.7, mb: pi < body.split("\n\n").length - 1 ? 1.2 : 0, whiteSpace: "pre-line" }}>
                  {para}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid #d6d9de" }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "#0d1b2a",
            color: "#fff",
            fontWeight: 600,
            px: 3.5,
            py: 1,
            fontSize: 13,
            borderRadius: 0,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            boxShadow: "none",
            "&:hover": { backgroundColor: "#1a3a5c", boxShadow: "none" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PrivacyPolicyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
