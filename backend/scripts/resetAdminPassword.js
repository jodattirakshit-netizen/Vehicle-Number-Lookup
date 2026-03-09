require('dotenv').config();
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const email = process.argv[2] || 'admin@vnl.com';
const plainPassword = process.argv[3] || 'Admin@123';

(async () => {
  const hash = await bcrypt.hash(plainPassword, 10);
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'vehicle_lookup_system'
  });

  const [result] = await pool.query('UPDATE admins SET password = ? WHERE email = ?', [hash, email]);
  console.log(`Updated rows: ${result.affectedRows}`);
  console.log(`Email: ${email}`);
  console.log(`Password set to: ${plainPassword}`);
  await pool.end();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

