import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import CustomBox from "components/CustomBox";
import CustomTypography from "components/CustomTypography";
import DashboardLayout from "ui/LayoutContainers/DashboardLayout";
import DashboardNavbar from "ui/Navbars/DashboardNavbar";
import { useAuthStore } from "stores/useAuthStore";

import FinancialExplanation from "./FinancialExplanation";
import ProRataTable from "./ProRataTable";
import useAggregatedFinancials from "./useAggregatedFinancials";

function BalanceSheet() {
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const { loading, aggregatedData, allAccountsWithLogos } =
    useAggregatedFinancials(selectedAccountId);
  const user = useAuthStore((state) => state.user);
  const hasRows = Array.isArray(aggregatedData?.rows) && aggregatedData.rows.length > 0;
  const isLoggedIn = Boolean(user?.email);

  // Auto-select first account when available
  useEffect(() => {
    if (!selectedAccountId && Array.isArray(allAccountsWithLogos) && allAccountsWithLogos.length) {
      const firstAvailable = allAccountsWithLogos.find((acc) => acc.isAvailable !== false);
      setSelectedAccountId(firstAvailable ? firstAvailable.id : allAccountsWithLogos[0].id);
    }
  }, [allAccountsWithLogos, selectedAccountId]);

  const selectedAcc = (allAccountsWithLogos || []).find((a) => a.id === selectedAccountId);
  const handleSelect = (id) => setSelectedAccountId(id);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CustomBox py={1}>
        <Card
          sx={{
            p: 3,
            background: "background.paper",
            overflowX: "hidden",
            overflowY: "auto",
            borderRadius: 3,
            boxShadow: 6,
            border: "1px solid",
            borderColor: "divider",
            width: "100%",
            maxWidth: "100%",
            height: "calc(100vh - 180px)",
            maxHeight: "calc(100vh - 180px)",
            display: "flex",
            flexDirection: "column",
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
          }}
        >
            <CustomTypography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 1.5 }}>
              Balance Sheet
            </CustomTypography>

            {/* Account selector */}
            {allAccountsWithLogos.length > 0 && (
              <CustomBox mb={1.5}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <CustomTypography variant="h6" fontWeight="medium">
                    Accounts
                  </CustomTypography>
                  {selectedAcc && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <img src={selectedAcc.logo} alt="selected account" style={{ height: 18 }} />
                      <CustomTypography variant="caption" color="text">
                        Viewing: {selectedAcc.brokerageName}
                      </CustomTypography>
                      {selectedAcc.accountNumber && (
                        <CustomTypography variant="caption" color="text">
                          #{selectedAcc.accountNumber}
                        </CustomTypography>
                      )}
                    </Box>
                  )}
                </Box>
                <Box display="flex" flexWrap="wrap" gap={0.75}>
                  {allAccountsWithLogos.map((acc) => {
                    const isAvailable = acc.isAvailable !== false;
                    const unsupportedMessage = !isAvailable
                      ? `Unsupported market: ${
                          acc.disallowedMarkets?.length
                            ? acc.disallowedMarkets.join(", ")
                            : "Unsupported market"
                        }`
                      : null;
                    return (
                      <Box
                        key={acc.id}
                        onClick={() => (isAvailable ? handleSelect(acc.id) : null)}
                        display="flex"
                        alignItems="center"
                        gap={0.75}
                        sx={{
                          border:
                            selectedAccountId === acc.id ? "2px solid #344767" : "1px solid #eee",
                          borderRadius: 2,
                          px: 1,
                          py: 0.45,
                          minHeight: 34,
                          minWidth: { xs: "100%", md: 220 },
                          maxWidth: { xs: "100%", md: 420 },
                          backgroundColor: selectedAccountId === acc.id ? "#eef2ff" : "#fafbfc",
                          cursor: isAvailable ? "pointer" : "not-allowed",
                          opacity: isAvailable ? 1 : 0.6,
                        }}
                        title={`${acc.brokerageName} #${acc.accountNumber}`}
                      >
                        <img src={acc.logo} alt={`${acc.brokerageName} logo`} style={{ height: 14 }} />
                        <Box display="flex" alignItems="center" gap={0.45} sx={{ minWidth: 0 }}>
                          <CustomTypography
                            variant="button"
                            color="text"
                            sx={{
                              fontWeight: 600,
                              fontSize: 13,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: { xs: "100%", md: 180 },
                            }}
                          >
                            {acc.brokerageName}
                          </CustomTypography>
                          {acc.accountNumber && (
                            <CustomTypography
                              variant="caption"
                              color="text"
                              sx={{ fontSize: 11.5, whiteSpace: "nowrap" }}
                            >
                              #{acc.accountNumber}
                            </CustomTypography>
                          )}
                          {unsupportedMessage && (
                            <CustomTypography
                              variant="caption"
                              color="text"
                              sx={{
                                color: "text.secondary",
                                fontSize: 11,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: { xs: "100%", md: 165 },
                              }}
                            >
                              {unsupportedMessage}
                            </CustomTypography>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </CustomBox>
            )}

            <FinancialExplanation />
            <ProRataTable
              loading={loading}
              data={aggregatedData}
              height="calc(100vh - 420px)"
              paywall={{ enabled: hasRows && !isLoggedIn, registerPath: "/billing" }}
            />
        </Card>
      </CustomBox>
    </DashboardLayout>
  );
}

export default BalanceSheet;
