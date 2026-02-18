import React from "react";
import CustomTypography from "components/CustomTypography";

function FinancialExplanation() {
  return (
    <CustomTypography
      variant="body2"
      sx={{ mb: 2, display: "block", fontSize: 14, fontWeight: 400, color: "#4B5563", lineHeight: 1.7 }}
    >
      This table shows your proportionate share of each company’s balance sheet. Proportionate Share
      of the Balance Sheet shows the portion of a company’s assets, liabilities, and equity you
      effectively own based on your shareholding. For example, if you own 1% of a company, we
      calculate 1% of its assets, cash, liabilities, and equity. and other balance sheet items—so
      you can see exactly what resources and obligations your investment represents, just as if you
      personally owned that fraction of the entire business.
    </CustomTypography>
  );
}

export default FinancialExplanation;
