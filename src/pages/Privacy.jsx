import LegalDocumentLayout from "components/LegalDocumentLayout";
import CustomTypography from "components/CustomTypography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

const FS = 13;

const P = (props) => (
  <Box component="p" sx={{ lineHeight: 1.6, fontSize: FS, color: "#4B5563", fontFamily: "inherit", m: 0, mb: 0.6 }} {...props} />
);

const Bullets = ({ items }) => (
  <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 0.6 }}>
    {items.map((item, i) => (
      <Box component="li" key={i} sx={{ fontSize: FS, lineHeight: 1.6, color: "#4B5563", fontFamily: "inherit", mb: 0.3 }}>
        {item}
      </Box>
    ))}
  </Box>
);

Bullets.propTypes = { items: PropTypes.arrayOf(PropTypes.node).isRequired };

const SectionHeading = ({ children }) => (
  <CustomTypography
    variant="h6"
    fontWeight={700}
    sx={{ mt: 1.5, mb: 0.75, fontSize: "0.42rem", textTransform: "uppercase", letterSpacing: 0.8, color: "#111827" }}
  >
    {children}
  </CustomTypography>
);

SectionHeading.propTypes = { children: PropTypes.node.isRequired };

const D = () => <Divider sx={{ my: 1.5, borderColor: "#d6d9de" }} />;

export default function Privacy() {
  return (
    <LegalDocumentLayout title="Privacy Policy" effectiveDate="February 18, 2026" hideMetadata>

      <SectionHeading>Overview</SectionHeading>
      <P>This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit our website or use the Service.</P>
      <P>The Service provides portfolio analytics that translate your brokerage holdings into an &ldquo;owner&rsquo;s view&rdquo; of what you own, including look-through, pro-rata estimates of business-level fundamentals derived from your holdings and public or licensed financial data sources.</P>
      <P>By accessing or using the Service, you acknowledge that you have read and understood this Privacy Policy.</P>

      <D />
      <SectionHeading>Definitions</SectionHeading>
      <Bullets items={[
        <><strong>&ldquo;Personal Information&rdquo;</strong> means information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked (directly or indirectly) with you, your household, or your device.</>,
        <><strong>&ldquo;Brokerage Data&rdquo;</strong> means account and portfolio data made available to us through your authorized connection to your brokerage account (including holdings/positions and related account details).</>,
        <><strong>&ldquo;Sensitive Personal Information&rdquo;</strong> refers to certain categories of personal information that are treated as sensitive under some laws. We treat Brokerage Data as sensitive as a matter of best practice, even if a particular legal definition does not apply in your jurisdiction.</>,
      ]} />

      <D />
      <SectionHeading>Scope</SectionHeading>
      <P>This Privacy Policy applies to our website and associated pages and forms (the &ldquo;Website&rdquo;); and the Service, including any web app, authenticated product experience, and customer support interactions. It does not apply to third-party websites, brokerages, or third-party services you may access through links or integrations.</P>

      <D />
      <SectionHeading>Information We Collect</SectionHeading>
      <P><strong>Information you provide to us:</strong></P>
      <Bullets items={[
        "Account and profile information — name, email address, password, and basic account preferences.",
        "Subscription and billing-related information — plan selection, billing contact information, and billing status. Payments are processed by Stripe. We do not store full payment card numbers.",
        "Communications — email content, support requests, and feedback.",
      ]} />
      <P><strong>Information we collect automatically:</strong></P>
      <Bullets items={[
        "Device and usage data — IP address, device identifiers, browser type, operating system, pages viewed, time spent, referring URLs, and interactions with features.",
        "Cookies and similar technologies — we may use cookies, SDKs, pixels, local storage, and similar technologies to operate the Website and improve the Service.",
      ]} />
      <P><strong>Brokerage Data you authorize us to access:</strong> When you connect a brokerage account, the connection flow is handled by SnapTrade. We do not ask for or intentionally collect your brokerage username or password. Once you authorize access, we may receive:</P>
      <Bullets items={[
        "Account identifiers and metadata (e.g., institution name, account type, masked account number, and account-level status);",
        "Holdings and positions (e.g., tickers/symbols, quantities, and descriptions);",
        "Balance and valuation data (e.g., cash balance, total account value, currency);",
        "Limited activity data if needed for Service functionality and if available.",
      ]} />
      <P><strong>Information from third parties:</strong></P>
      <Bullets items={[
        "Service providers that help us operate (e.g., hosting, email delivery, analytics, customer support, and payment processors);",
        "Public sources and licensed data providers used to compute business-level fundamentals or generate analytics.",
      ]} />

      <D />
      <SectionHeading>How We Use Information</SectionHeading>
      <Bullets items={[
        <><strong>Provide and operate the Service</strong> — creating your account, connecting brokerage accounts at your direction, generating reports, and delivering product features.</>,
        <><strong>Secure the Service</strong> — authentication, access control, monitoring, debugging, preventing abuse, fraud detection, and protecting against malicious activity.</>,
        <><strong>Improve and develop the Service</strong> — analytics and performance measurement, feature development, and quality assurance.</>,
        <><strong>Customer support and communications</strong> — responding to inquiries, sending service notices, receipts, security alerts, and administrative messages.</>,
        <><strong>Billing and accounting</strong> — processing subscriptions, invoices, confirmations, and handling disputes or chargebacks.</>,
        <><strong>Legal and compliance</strong> — complying with applicable law, responding to lawful requests, enforcing terms, and protecting rights and safety.</>,
      ]} />

      <D />
      <SectionHeading>Legal Bases for Processing</SectionHeading>
      <P>Where required by applicable law, we process personal information based on one or more of the following:</P>
      <Bullets items={[
        "Contract performance (to provide the Service you request);",
        "Legitimate interests (e.g., securing and improving the Service, preventing fraud);",
        "Consent (e.g., where required for certain cookies/marketing communications);",
        "Legal obligation (to comply with laws, regulations, or lawful requests).",
      ]} />

      <D />
      <SectionHeading>How We Disclose Information</SectionHeading>
      <P>We do not sell personal information in the ordinary sense of &ldquo;selling your data for money.&rdquo; We also do not rent personal information. We may disclose personal information as follows:</P>
      <P><strong>Service providers and processors</strong> — vendors performing services on our behalf such as:</P>
      <Bullets items={[
        "Payment processing;",
        "Cloud hosting, storage, and databases;",
        "Security monitoring and fraud prevention;",
        "Customer support tools;",
        "Email and communications delivery;",
        "Analytics and product measurement.",
      ]} />
      <P>These service providers are permitted to process personal information only for the services they provide to us, consistent with applicable contracts.</P>
      <P><strong>Brokerage connection provider</strong> — When you connect your brokerage account, the connection provider facilitates that connection. The connection provider&rsquo;s processing is governed by its own terms and privacy policy.</P>
      <P><strong>Legal, compliance, and protection of rights</strong> — We may disclose personal information if necessary to:</P>
      <Bullets items={[
        "Comply with applicable law, regulation, legal process, or lawful governmental request;",
        "Protect the rights, security, and safety of our users, our business, or others;",
        "Detect, prevent, or address fraud, security, or technical issues.",
      ]} />
      <P><strong>Business transactions</strong> — If we are involved in a merger, acquisition, financing, restructuring, bankruptcy, or sale of assets, personal information may be disclosed or transferred as part of that transaction, subject to standard confidentiality protections.</P>
      <P><strong>With your direction</strong> — We may disclose information when you direct us to do so.</P>

      <D />
      <SectionHeading>Cookies and Similar Technologies</SectionHeading>
      <P>We use cookies and similar technologies for:</P>
      <Bullets items={[
        "Strictly necessary purposes (e.g., authentication, security, session management);",
        "Preferences (e.g., language and settings);",
        "Analytics (e.g., performance and feature usage).",
      ]} />
      <P>You can manage cookies through your browser settings, but disabling some cookies may limit functionality.</P>

      <D />
      <SectionHeading>Data Retention</SectionHeading>
      <P>We retain personal information only as long as reasonably necessary, including for:</P>
      <Bullets items={[
        "Maintaining your account;",
        "Providing the Service and maintaining a historical record of reports;",
        "Complying with legal, tax, accounting, and regulatory obligations;",
        "Resolving disputes and enforcing agreements.",
      ]} />
      <P>Retention periods vary by data type and context, and we may retain certain records for longer where required or permitted by law.</P>

      <D />
      <SectionHeading>Disconnection and Deletion</SectionHeading>
      <P>You can disconnect your brokerage connection through available product controls or by contacting us. If you request account deletion, we will take reasonable steps to delete or de-identify personal information associated with your account, subject to lawful exceptions. Where applicable, we may also delete associated data held by our brokerage connection provider in a manner supported by their platform.</P>

      <D />
      <SectionHeading>Security</SectionHeading>
      <P>We implement administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, disclosure, alteration, or destruction. However, no security program is perfect, and we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your login credentials and for using appropriate security measures on your devices and accounts.</P>

      <D />
      <SectionHeading>International Transfers</SectionHeading>
      <P>We are based in the United States and may process and store information in the United States and other jurisdictions where we or our service providers operate. Data protection laws in those jurisdictions may differ from those in your location. Where required by applicable law, we take steps designed to provide an appropriate level of protection for international transfers.</P>

      <D />
      <SectionHeading>Your Rights and Choices</SectionHeading>
      <P>Your rights depend on where you live. You may have the right to:</P>
      <Bullets items={[
        "Request access to personal information we hold about you;",
        "Request correction of inaccurate or incomplete personal information;",
        "Request deletion of personal information (subject to lawful exceptions);",
        "Object to or restrict certain processing (in some jurisdictions);",
        "Request portability of certain personal information;",
        "Withdraw consent where we rely on consent.",
      ]} />
      <P>To exercise rights, contact us at <Link href="mailto:howard@stockownerreport.com" sx={{ color: "#0d1b2a", fontWeight: 600, fontSize: FS }}>howard@stockownerreport.com</Link>. We may need to verify your identity before processing your request.</P>

      <D />
      <SectionHeading>California and Certain U.S. Privacy Rights</SectionHeading>
      <P>If you are a California resident, you may have rights under California privacy law, including rights to know, delete, opt out of sale/sharing (including via a user-enabled global privacy control), non-discrimination, and &mdash; under CPRA amendments &mdash; rights to correct and limit use/disclosure of sensitive personal information.</P>
      <P>If we are required to recognize an opt-out preference signal (such as the Global Privacy Control), we will treat it as a valid opt-out request for the browser/device that sends the signal, consistent with applicable requirements.</P>

      <D />
      <SectionHeading>Canada</SectionHeading>
      <P>If you are in Canada, you may have rights of access and correction and the right to challenge compliance, consistent with Canadian privacy laws and principles-based frameworks (including PIPEDA&rsquo;s fair information principles). If a breach of security safeguards creates a real risk of significant harm, mandatory reporting/notification obligations may apply, and breach records may be required.</P>
      <P>For Qu&eacute;bec residents, our Privacy Officer can be reached at <Link href="mailto:howard@stockownerreport.com" sx={{ color: "#0d1b2a", fontWeight: 600, fontSize: FS }}>howard@stockownerreport.com</Link>. Qu&eacute;bec law requires enterprises to publish the title and contact information of the person in charge on the enterprise&rsquo;s website, and also contemplates governance policies/practices and handling of &ldquo;confidentiality incidents.&rdquo;</P>

      <D />
      <SectionHeading>United Kingdom and Other Jurisdictions with Similar Rights</SectionHeading>
      <P>If you are located in the United Kingdom, privacy rights and notice expectations generally arise under the UK GDPR and the Data Protection Act 2018. Some jurisdictions require regulator notification for certain personal data breaches within specific timeframes (for example, UK guidance describes notifying the regulator within 72 hours in applicable cases).</P>

      <D />
      <SectionHeading>Marketing Communications</SectionHeading>
      <P>If we send promotional communications, you can opt out by using the unsubscribe mechanism included in those messages or by contacting us. We may still send you non-promotional administrative or service-related messages. If you are in Canada, commercial electronic messaging rules may require consent and specific unsubscribe handling timelines; we design our email practices to be consistent with those expectations.</P>

      <D />
      <SectionHeading>Children&rsquo;s Privacy</SectionHeading>
      <P>The Service is not directed to children, and we do not knowingly collect personal information from individuals under 18. If you believe a child has provided personal information, contact us and we will take appropriate steps.</P>

      <D />
      <SectionHeading>Changes to This Privacy Policy</SectionHeading>
      <P>We may update this Privacy Policy from time to time. The &ldquo;Last Updated&rdquo; date at the top indicates when it was most recently revised. If we make material changes, we will take reasonable steps to provide notice, such as by posting a notice on the Website or emailing account holders.</P>

      <D />
      <SectionHeading>Contact Us</SectionHeading>
      <P>
        LookThroughProfits, Inc. &mdash; Attn: Privacy Officer<br />
        169 Madison Ave STE 38180, New York, NY 10016, United States<br />
        <Link href="mailto:howard@stockownerreport.com" sx={{ color: "#0d1b2a", fontWeight: 600, fontSize: FS }}>
          howard@stockownerreport.com
        </Link>
      </P>
    </LegalDocumentLayout>
  );
}