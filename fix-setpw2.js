const fs = require('fs');
const f = 'src/layouts/setPassword/setPassword.jsx';
let c = fs.readFileSync(f, 'utf8');

// Fix the error fallback panel heading (line ~134)
c = c.replace(
  '          <CustomTypography variant="h4" fontWeight="bold" color="text" sx={{ mb: 1.5 }}>\r\n            Password Reset Link\r\n          </CustomTypography>',
  '          <CustomTypography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#6b7280", textTransform: "uppercase", mb: 1, textAlign: "center" }}>\r\n            Password Reset Link\r\n          </CustomTypography>'
);

// Fix the error panel card style (sharp corners, no shadow)
c = c.replace(
  '            background: "#fff",\r\n            border: "1px solid #e8edf3",',
  '            background: "#fff",\r\n            border: "1px solid #d6d9de",\r\n            borderTop: "2px solid #0d1b2a",\r\n            borderRadius: 0,\r\n            boxShadow: "none",'
);

console.log('h4 variants remaining:', (c.match(/variant="h4"/g) || []).length);
fs.writeFileSync(f, c, 'utf8');
console.log('Done.');
