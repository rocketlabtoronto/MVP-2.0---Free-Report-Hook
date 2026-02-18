import React, { useState } from "react";
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
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
          <form onSubmit={handleLogin}>
            <TextField
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
          <CustomTypography variant="caption" color="text" sx={{ textAlign: "center", mt: 1.5 }}>
            Don&apos;t have an account?&nbsp;
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
