import { useEffect, useMemo, useState } from "react";
import AuthPageLayout from "components/AuthPageLayout";
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

  /** @type {React.CSSProperties} */
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
  };

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
          <div style={{ fontWeight: 700, fontSize: 24, color: "#344767", marginBottom: 12 }}>
            Password Reset Link
          </div>
          <div style={{ fontSize: 16, color: "#d32f2f", fontWeight: 600, marginBottom: 14 }}>
            {error || "Missing or invalid password reset link."}
          </div>

          <div style={{ fontSize: 15, color: "#344767", lineHeight: 1.65 }}>
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
            <a
              href="/send-password-reset"
              style={{ color: "#5e72e4", textDecoration: "underline", fontWeight: 500 }}
            >
              Send Password Reset
            </a>
            &nbsp;page to request a new link.
            <br />
            <br />
            Support:{" "}
            <a href="mailto:support@stockownerreport.com" style={{ textDecoration: "underline" }}>
              support@stockownerreport.com
            </a>
          </div>
        </div>
      ) : (
        <>
          <h2 style={{ fontWeight: "bold", color: "#344767", marginBottom: 16, textAlign: "center" }}>
            Set Your Password
          </h2>

          {success ? (
            <div style={{ color: "#388e3c", textAlign: "center" }}>
              Password set successfully! Redirecting to login...
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 16 }}>
                <input
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {error && (
                <div
                  style={{
                    color: "#d32f2f",
                    marginBottom: 12,
                    textAlign: "left",
                    fontSize: 14,
                    whiteSpace: "pre-line",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  background: "#5e72e4",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onClick={handleSetPassword}
                disabled={loading}
              >
                {loading ? "Saving..." : "Set Password"}
              </button>
            </>
          )}
        </>
      )}
    </AuthPageLayout>
  );
}
