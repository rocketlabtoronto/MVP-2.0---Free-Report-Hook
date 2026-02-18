import { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import AuthPageLayout from "components/AuthPageLayout";
import CustomTypography from "components/CustomTypography";
import { supabase } from "../../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";
import { encrypt } from "../../services/encryptionService";

export default function SetPassword() {
  // Hide sidebar/navbar while on this page
  useEffect(() => {
    const sidebar = document.getElementById("sidenav-main");
    const navbar = document.getElementById("navbar-main");
    if (sidebar) sidebar.style.display = "none";
    if (navbar) navbar.style.display = "none";
    return () => {
      if (sidebar) sidebar.style.display = "";
      if (navbar) navbar.style.display = "";
    };
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  // Read token from URL querystring (react-router safe)
  const token = useMemo(() => {
    return new URLSearchParams(location.search).get("token")?.trim() ?? "";
  }, [location.search]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSetPassword = async () => {
    console.log("[SetPassword] Step 1 - Clicked Set Password");

    // Step 2: Basic checks
    if (!token) {
      console.error("[SetPassword] Step 2 - Missing token");
      setError("Missing or invalid password reset link.");
      return;
    }

    // Step 3: Password strength validation
    console.log("[SetPassword] Step 3 - Validating password rules");
    const passwordErrors = [];
    if (password.length < 8) passwordErrors.push("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(password)) passwordErrors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) passwordErrors.push("Password must contain at least one lowercase letter.");
    if (!/[0-9]/.test(password)) passwordErrors.push("Password must contain at least one number.");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
      passwordErrors.push("Password must contain at least one special character.");

    if (passwordErrors.length > 0) {
      console.error("[SetPassword] Step 3 - Password validation failed", { passwordErrors });
      setError(passwordErrors.join("\n"));
      return;
    }

    if (password !== confirm) {
      console.error("[SetPassword] Step 3 - Passwords do not match");
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 4: Hash/encrypt password (client-side)
      console.log("[SetPassword] Step 4 - Encrypting password");
      const passwordHash = await encrypt(password);

      // Step 5: Send token + hash to Edge Function (server-side validation + update)
      // IMPORTANT: This avoids browser SELECT/UPDATE on protected tables.
      console.log("[SetPassword] Step 5 - Calling Edge Function set-password-with-token");
      const { data, error } = await supabase.functions.invoke("set-password-with-token", {
        body: { token, passwordHash },
      });

      console.log("[SetPassword] Step 6 - Edge Function responded", { data, error });

      if (error) {
        console.error("[SetPassword] Step 6 - Edge Function error", error);
        setError(error.message || "Could not set password.");
        return;
      }

      if (!data?.success) {
        console.error("[SetPassword] Step 6 - Edge Function returned failure", data);
        setError(data?.error || "Token is invalid or expired.");
        return;
      }

      // Step 7: Success
      console.log("[SetPassword] Step 7 - Password set successfully");
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (e) {
      console.error("[SetPassword] Catch - Unhandled error", e);
      setError(e?.message ?? "Unexpected error setting password.");
    } finally {
      setLoading(false);
      console.log("[SetPassword] Final - Done");
    }
  };

  // If token is missing, show the info/error page
  const showInfoPage = !token;

  return (
    <AuthPageLayout showLogo={false} cardStyle={{ maxWidth: 520, padding: 28 }}>
      {showInfoPage ? (
        <div
          style={{
            marginBottom: 8,
            textAlign: "left",
            padding: "20px",
            borderRadius: 10,
            background: "#fff",
            border: "1px solid #e8edf3",
          }}
        >
          <CustomTypography variant="h4" fontWeight="bold" color="text" sx={{ mb: 1.5 }}>
            Password Reset Link
          </CustomTypography>
          <CustomTypography variant="body2" color="error" fontWeight="medium" sx={{ mb: 1.75 }}>
            {error || "Missing or invalid password reset link."}
          </CustomTypography>

          <CustomTypography
            variant="caption"
            color="text"
            sx={{ fontSize: 15, lineHeight: 1.65, display: "block" }}
          >
            You have reached this page because you clicked a password setup or reset link.
            <br />
            <br />
            <span style={{ fontWeight: 600 }}>
              For your security, links are valid for 30 minutes and can only be used once. If your link is
              missing or expired, you will need to request a new one.
            </span>
            <br />
            <br />
            Please use the&nbsp;
            <Link href="/send-password-reset" sx={{ color: "primary.main", textDecoration: "underline", fontWeight: 600 }}>
              Send Password Reset
            </Link>
            &nbsp;page to request a new link.
            <br />
            <br />
            Support:{" "}
            <Link href="mailto:howard@stockownerreport.com" sx={{ textDecoration: "underline" }}>
              howard@stockownerreport.com
            </Link>
          </CustomTypography>
        </div>
      ) : (
        <>
          <CustomTypography variant="h4" fontWeight="bold" color="text" sx={{ mb: 2, textAlign: "center" }}>
            Set Your Password
          </CustomTypography>

          {success ? (
            <CustomTypography variant="caption" color="success" sx={{ textAlign: "center", display: "block" }}>
              Password set successfully! Redirecting to login...
            </CustomTypography>
          ) : (
            <>
              <TextField
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />

              <TextField
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mb: 3 }}
              />

              {error && (
                <CustomTypography
                  variant="caption"
                  color="error"
                  sx={{ mb: 1.5, textAlign: "left", whiteSpace: "pre-line", display: "block" }}
                >
                  {error}
                </CustomTypography>
              )}

              <Button
                variant="contained"
                fullWidth
                sx={{ py: 1.1, fontWeight: 700 }}
                onClick={handleSetPassword}
                disabled={loading}
              >
                {loading ? "Saving..." : "Set Password"}
              </Button>
            </>
          )}
        </>
      )}
    </AuthPageLayout>
  );
}
