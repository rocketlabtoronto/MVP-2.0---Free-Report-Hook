import Card from "@mui/material/Card";
import DashboardLayout from "ui/LayoutContainers/DashboardLayout";
import DashboardNavbar from "ui/Navbars/DashboardNavbar";

// @mui material components
// import Button from '@mui/material/Button';

// Custom Dashboard 2 MUI components
import CustomBox from "components/CustomBox";
import CustomTypography from "components/CustomTypography";

// Custom Dashboard 2 MUI components

// Billing page components
import BillingInformation from "layouts/billing/components/BillingInformation";
import { useAppStore } from "../../stores/store";

function Billing() {
  const userSession = useAppStore((state) => state.session);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CustomBox py={3}>
        <CustomBox display="flex" justifyContent="center">
          <Card
            sx={{
              p: 3,
              background: "background.paper",
              overflow: "visible",
              borderRadius: 3,
              boxShadow: 6,
              border: "1px solid",
              borderColor: "divider",
              maxWidth: 400,
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
            }}
          >
            <CustomTypography variant="h4" fontWeight="bold" color="text" sx={{ mb: 2 }}>
              Billing
            </CustomTypography>
            <BillingInformation
              userSession={userSession}
            />
          </Card>
        </CustomBox>
      </CustomBox>
    </DashboardLayout>
  );
}

export default Billing;
