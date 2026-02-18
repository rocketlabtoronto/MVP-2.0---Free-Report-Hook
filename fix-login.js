const fs = require('fs');
const f = 'src/layouts/login/login.jsx';
let c = fs.readFileSync(f, 'utf8');

// Replace login h4 heading with GS overline + subheading
c = c.replace(
  '      <CustomTypography variant="h4" fontWeight="bold" color="text" sx={{ mb: 2, textAlign: "center" }}>\r\n        Login\r\n      </CustomTypography>',
  '      <CustomTypography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#6b7280", textTransform: "uppercase", mb: 0.5, textAlign: "center" }}>\r\n        Investor Dashboard\r\n      </CustomTypography>\r\n      <CustomTypography sx={{ fontSize: 16, fontWeight: 600, color: "#0d1b2a", mb: 2, textAlign: "center" }}>\r\n        Sign In to Your Account\r\n      </CustomTypography>'
);

console.log('h4 variants remaining:', (c.match(/variant="h4"/g) || []).length);
fs.writeFileSync(f, c, 'utf8');
console.log('Done.');
