import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { supabase } from "../../supabaseClient";
import { decrypt } from "../../services/encryptionService";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import AuthPageLayout from "components/AuthPageLayout";
import CustomTypography from "components/CustomTypography";
const logo = "/logos/logo_image.jpg";
const EMAIL_MAX_LENGTH = 36;
const PASSWORD_MAX_LENGTH = 36;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [subscriptionExpired, setSubscriptionExpired] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubscriptionExpired(false);
    try {
      // Fetch user by email
      const { data, error } = await supabase
        .schema("public")
        .from("users")
        .select("*")
        .eq("email", email)
        .single();
      if (error || !data || !data.password_hash) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }
      // Decrypt password
      let decryptedPassword = "";
      try {
        decryptedPassword = await decrypt(data.password_hash);
      } catch (err) {
        setError("Error decrypting password.");
        setLoading(false);
        return;
      }
      if (decryptedPassword === password) {
        // --- Subscription validity check ---
        // We derive the expiration date purely from subscription_interval and
        // last_payment_at stored on the user row. No extra DB field is written.
        //
        // Strategy for "add one month" (subscription_interval === 'month'):
        //   We use Date's built-in month arithmetic. JavaScript's Date constructor
        //   rolls over automatically when the resulting day would not exist in the
        //   target month (e.g. Jan 31 + 1 month → Feb 31 → Mar 3 in a non-leap
        //   year, or Mar 2 in a leap year). To avoid inadvertently granting a few
        //   extra days in short months, we instead let the Date object overflow and
        //   then compare: if the day-of-month changed after setMonth(), we went past
        //   the end of the target month, so we back up to the last day of that month.
        //   Example: last_payment_at = Jan 31 → setMonth(+1) gives Mar 3 → we detect
        //   the overflow and floor back to Feb 28 (or Feb 29 in a leap year).
        //
        // Strategy for "add one year" (subscription_interval === 'year'):
        //   Same principle with setFullYear(+1). The only edge case is Feb 29 in a
        //   leap year: adding 1 year to 2024-02-29 would produce 2025-02-29, which
        //   doesn't exist, so JavaScript rolls to 2025-03-01. We detect the day change
        //   and back up to the last day of the target February (2025-02-28).

        const { subscription_interval, last_payment_at } = data;

        if (subscription_interval && last_payment_at) {
          const paymentDate = new Date(last_payment_at);

          // Compute expiry date without mutating paymentDate.
          const expiry = new Date(paymentDate);

          if (subscription_interval === "month") {
            const originalDay = expiry.getDate();
            expiry.setMonth(expiry.getMonth() + 1);
            // If the day changed, JS overflowed into the next month (e.g. Jan 31 →
            // Mar 2/3). Back up to the last day of the intended target month by
            // setting day=0 on the overflowed month (day 0 = last day of prev month).
            if (expiry.getDate() !== originalDay) {
              expiry.setDate(0);
            }
          } else if (subscription_interval === "year") {
            const originalDay = expiry.getDate();
            expiry.setFullYear(expiry.getFullYear() + 1);
            // Handle Feb 29 in a leap year paid on → Feb 28/29 next year.
            if (expiry.getDate() !== originalDay) {
              expiry.setDate(0);
            }
          }
          // If subscription_interval is an unrecognised value (e.g. a future plan
          // type), we fall through and allow login — handle explicitly if needed.

          const now = new Date();
          if (now > expiry) {
            // Subscription has lapsed. Tell the user when it expired and give them
            // a clear path to renew. We intentionally do NOT call setUser() so the
            // session is never established.
            const formattedExpiry = expiry.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            setError(
              `Your subscription expired on ${formattedExpiry}.\nPlease renew to continue.`
            );
            // Render a renew CTA by storing a special flag in the error state so
            // the JSX below can show the billing link.
            setSubscriptionExpired(true);
            setLoading(false);
            return;
          }
        }
        // --- End subscription check ---

        setSuccess(true);
        setUser(data);
        navigate("/brokeragesAndAccounts");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <AuthPageLayout logoSrc={logo} cardStyle={{ padding: 16 }}>
      <CustomTypography variant="h4" fontWeight="bold" color="text" sx={{ mb: 2, textAlign: "center" }}>
        Login
      </CustomTypography>
      {success ? (
        <CustomTypography variant="caption" color="success" sx={{ textAlign: "center", display: "block" }}>
          Login successful! Redirecting...
        </CustomTypography>
      ) : (
        <>
          <form onSubmit={handleLogin} autoComplete="off">
            <TextField
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value.slice(0, EMAIL_MAX_LENGTH))}
              autoComplete="off"
              inputProps={{ maxLength: EMAIL_MAX_LENGTH, autoComplete: "off", name: "login-email-input" }}
              required
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  minHeight: 46,
                },
                "& .MuiInputBase-input": {
                  fontSize: "1.1rem",
                  lineHeight: 1.5,
                  py: 1.1,
                },
              }}
            />
            <TextField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value.slice(0, PASSWORD_MAX_LENGTH))}
              autoComplete="new-password"
              inputProps={{
                maxLength: PASSWORD_MAX_LENGTH,
                autoComplete: "new-password",
                name: "login-password-input",
              }}
              required
              fullWidth
              variant="outlined"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  minHeight: 46,
                },
                "& .MuiInputBase-input": {
                  fontSize: "1.1rem",
                  lineHeight: 1.5,
                  py: 1.1,
                },
              }}
            />
            {error && (
              <CustomTypography
                variant="caption"
                color="error"
                sx={{ mb: subscriptionExpired ? 0.5 : 1.5, textAlign: "left", whiteSpace: "pre-line", display: "block" }}
              >
                {error}
              </CustomTypography>
            )}
            {subscriptionExpired && (
              <Button
                variant="outlined"
                fullWidth
                href="/billing"
                sx={{ mb: 1.5, fontWeight: 700, textTransform: "none" }}
              >
                Renew Subscription
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ py: 1.1, fontWeight: 700 }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <CustomTypography variant="caption" color="text" sx={{ textAlign: "center", mt: 2.25 }}>
            Forgot your password?&nbsp;
            <Link href="/send-password-reset" sx={{ color: "primary.main", textDecoration: "underline", fontWeight: 600 }}>
              Send Password Reset
            </Link>
          </CustomTypography>
          <CustomTypography
            variant="caption"
            color="text"
            sx={{ textAlign: "center", mt: 1.5, display: "block" }}
          >
            Don&apos;t have an account?
          </CustomTypography>
          <CustomTypography variant="caption" color="text" sx={{ textAlign: "center", mt: 0.5, display: "block" }}>
            <Link href="/billing" sx={{ color: "primary.main", textDecoration: "underline", fontWeight: 600 }}>
              Sign Up
            </Link>
          </CustomTypography>
        </>
      )}
    </AuthPageLayout>
  );
}

export default Login;
