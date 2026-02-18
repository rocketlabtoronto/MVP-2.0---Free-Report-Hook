import React from "react";
import CustomTypography from "components/CustomTypography";

export default function EnvironmentDebug() {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", margin: "20px" }}>
      <CustomTypography variant="h4" fontWeight="bold" color="text" sx={{ mb: 1.5 }}>
        Environment Variables Debug
      </CustomTypography>
      <CustomTypography variant="caption" color="text" sx={{ display: "block" }}>
        <strong>NODE_ENV:</strong> {process.env.NODE_ENV}
      </CustomTypography>
      <CustomTypography variant="caption" color="text" sx={{ display: "block" }}>
        <strong>REACT_APP_SUPABASE_URL:</strong> {process.env.REACT_APP_SUPABASE_URL || "UNDEFINED"}
      </CustomTypography>
      <CustomTypography variant="caption" color="text" sx={{ display: "block" }}>
        <strong>REACT_APP_SUPABASE_ANON_KEY:</strong>{" "}
        {process.env.REACT_APP_SUPABASE_ANON_KEY ? "DEFINED" : "UNDEFINED"}
      </CustomTypography>
      <CustomTypography variant="caption" color="text" sx={{ display: "block", mb: 0.75 }}>
        <strong>All REACT_APP_ vars:</strong>
      </CustomTypography>
      <pre>
        {JSON.stringify(
          Object.keys(process.env)
            .filter((key) => key.startsWith("REACT_APP_"))
            .reduce((obj, key) => {
              obj[key] = key.includes("KEY") ? "HIDDEN" : process.env[key];
              return obj;
            }, {}),
          null,
          2
        )}
      </pre>
    </div>
  );
}
