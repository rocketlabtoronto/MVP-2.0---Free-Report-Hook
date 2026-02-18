const fs = require('fs');
const f = 'src/layouts/setPassword/setPassword.jsx';
let c = fs.readFileSync(f, 'utf8');

// Replace activation heading
c = c.replace(
  '              <CustomTypography variant="h4" fontWeight="bold" color="text" sx={{ mb: 1, textAlign: "center" }}>\r\n                Welcome to The Stock Owner Report\r\n              </CustomTypography>',
  '              <CustomTypography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#6b7280", textTransform: "uppercase", mb: 1, textAlign: "center" }}>\r\n                Account Activation\r\n              </CustomTypography>\r\n              <CustomTypography sx={{ fontSize: 16, fontWeight: 600, color: "#0d1b2a", mb: 0.5, textAlign: "center" }}>\r\n                Welcome to The Stock Owner Report\r\n              </CustomTypography>'
);

// Replace reset heading
c = c.replace(
  '              <CustomTypography variant="h4" fontWeight="bold" color="text" sx={{ mb: 1, textAlign: "center" }}>\r\n                Reset Your Password\r\n              </CustomTypography>',
  '              <CustomTypography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#6b7280", textTransform: "uppercase", mb: 1, textAlign: "center" }}>\r\n                Password Reset\r\n              </CustomTypography>\r\n              <CustomTypography sx={{ fontSize: 16, fontWeight: 600, color: "#0d1b2a", mb: 0.5, textAlign: "center" }}>\r\n                Reset Your Password\r\n              </CustomTypography>'
);

// Fix input fields - sharp corners GS style
c = c.replace(
  '"& .MuiOutlinedInput-root": { minHeight: 46 },\r\n                  "& .MuiInputBase-input": { fontSize: "1.1rem", lineHeight: 1.5, py: 1.1 },\r\n                }}\r\n              />\r\n\r\n              <TextField\r\n                type="password"\r\n                placeholder="Confirm password"',
  '"& .MuiOutlinedInput-root": { minHeight: 44, borderRadius: 0, "& fieldset": { borderColor: "#d6d9de" }, "&:hover fieldset": { borderColor: "#8c98a8" }, "&.Mui-focused fieldset": { borderColor: "#0d1b2a", borderWidth: 1.5 } },\r\n                  "& .MuiInputBase-input": { fontSize: "0.9rem", lineHeight: 1.5, py: 1.2 },\r\n                }}\r\n              />\r\n\r\n              <TextField\r\n                type="password"\r\n                placeholder="Confirm password"'
);
c = c.replace(
  '"& .MuiOutlinedInput-root": { minHeight: 46 },\r\n                  "& .MuiInputBase-input": { fontSize: "1.1rem", lineHeight: 1.5, py: 1.1 },\r\n                }}\r\n              />\r\n\r\n              {error',
  '"& .MuiOutlinedInput-root": { minHeight: 44, borderRadius: 0, "& fieldset": { borderColor: "#d6d9de" }, "&:hover fieldset": { borderColor: "#8c98a8" }, "&.Mui-focused fieldset": { borderColor: "#0d1b2a", borderWidth: 1.5 } },\r\n                  "& .MuiInputBase-input": { fontSize: "0.9rem", lineHeight: 1.5, py: 1.2 },\r\n                }}\r\n              />\r\n\r\n              {error'
);

// Replace generic button with GS style button
c = c.replace(
  '              <Button\r\n                variant="contained"\r\n                fullWidth\r\n                sx={{ py: 1.1, fontWeight: 700 }}\r\n                onClick={handleSetPassword}\r\n                disabled={loading}\r\n              >',
  '              <Button\r\n                variant="contained"\r\n                fullWidth\r\n                sx={{ py: 1.2, fontWeight: 700, borderRadius: 0, backgroundColor: "#0d1b2a", boxShadow: "none", textTransform: "uppercase", letterSpacing: 1.5, fontSize: 12, "&:hover": { backgroundColor: "#1a3a5c", boxShadow: "none" }, "&:disabled": { backgroundColor: "#9ca3af", color: "#fff" } }}\r\n                onClick={handleSetPassword}\r\n                disabled={loading}\r\n              >'
);

console.log('h4 variants remaining:', (c.match(/variant="h4"/g) || []).length);
console.log('GS navy present:', c.includes('#0d1b2a'));
fs.writeFileSync(f, c, 'utf8');
console.log('Done.');
